import { readdirSync } from "fs";
import { join } from "path";
import { IAsyncBotTask } from "../../adapter_types/async_bot_task";
import { instance as logger } from "../logger/logger";
import { LogTarget } from "../../adapter_types/logging";

const STARTUP_EVENTS_DIR = "./startup_commands/" as const;
const SHUTDOWN_EVENTS_DIR = "./shutdown_commands/" as const;

/**
 * @type AsyncTask
 * 
 * @description Represents an asynchronous task and potential callback for task failure.
 */
type AsyncTask = {
    runner: () => Promise<boolean>;
    onFail?: () => Promise<boolean>;
};

/**
 * @class DiscordBotAsyncTaskManager
 * 
 * Manages asynchronous tasks for the bot using a simple key-value map
 * of task names to tasks and optional callbacks for task failure.
 * 
 * @see {@link AsyncTask}
 */
class DiscordBotAsyncTaskManager {

    private tasks: Map<string, AsyncTask> = new Map();
    private onTasksFinished?: () => Promise<void> = undefined;

    constructor() {
    }

    /**
     * Sets task `taskName` to run `runner` and optionally run `onFail` if the task fails.
     * 
     * @param taskName The name of the task to add.
     * @param runner The asynchronous function to run.
     * @param onFail The callback to run if the task fails.
     */
    public setTask(taskName: string, task: AsyncTask) {
        this.tasks.set(taskName, task);
    }

    /**
     * Removes the task with the name `taskName`.
     * 
     * @param taskName The name of the task to remove.
     */
    public removeTask(taskName: string) {
        this.tasks.delete(taskName);
    }

    /**
     * Runs all tasks.
     */
    public async runTasks() {
        for (const [taskName, task] of this.tasks) {
            try {
                if (!await task.runner()) {
                    if (task.onFail) {
                        await task.onFail();
                    }
                }
            } catch (err) {
                logger.log(`Failed to run task ${taskName}: ${err}`, LogTarget.Error, "AsyncTaskManager");
                if (task.onFail) {
                    await task.onFail();
                }
            }
        }
        if (this.onTasksFinished) {
            await this.onTasksFinished();
        }
    }

    /**
     * Sets the callback to run when all tasks are finished.
     * 
     * @param onTasksFinished The callback to run when all tasks are finished.
     */
    public setOnTasksFinished(onTasksFinished: () => Promise<void>) {
        this.onTasksFinished = onTasksFinished;
    }
}

function createTaskManager(taskDir: string) {
    const taskManager = new DiscordBotAsyncTaskManager();
    const taskFiles = readdirSync(join(__dirname, taskDir)).filter(file => file.endsWith('.js'));
    for (const file of taskFiles) {
        try {
            logger.log(`Reading event from file ${file}`, LogTarget.Info, "AsyncTaskManager");
            const path = join(__dirname, `${taskDir}${file}`);
            const task = (require(path)).default as IAsyncBotTask;
            if (task.useTask) taskManager.setTask(task.taskName, { runner: task.runner, onFail: task.onFail });
            logger.log(`Added event from file ${file}`, LogTarget.Info, "AsyncTaskManager");
        } catch (err) {
            logger.log(`Failed to add event from file ${file}`, LogTarget.Error, "AsyncTaskManager");
        }
    }
    return taskManager;
}

export const startupTaskManager = createTaskManager(STARTUP_EVENTS_DIR);
export const shutdownTaskManager = createTaskManager(SHUTDOWN_EVENTS_DIR);