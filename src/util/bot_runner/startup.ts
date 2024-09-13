import { exit } from "process";
import { readdirSync } from "fs";
import { join } from "path";
import { IStartupEvent } from "../../types/startup";

// Dumb type annotation for boolean function
type StartupEventRunner = (() => Promise<boolean>) | { runner: () => Promise<boolean>, onFail: () => Promise<boolean> };

/**
 * Class Startup
 */
class Startup {

    status: "empty" | "ready" | "running" | "starting" | "started";
    startupCritEvents: Map<string, StartupEventRunner>;
    startupNoCritEvents: Map<string, StartupEventRunner>;
    starter?: () => void;

    constructor() {
        this.status = "empty";
        this.startupCritEvents = new Map();
        this.startupNoCritEvents = new Map();
    }

    public addStartupEvent(eventName: string, critical: boolean, runner: () => Promise<boolean>, onFail?: () => Promise<boolean>) {

        if (this.status == "running" || this.status == "starting" || this.status == "started") {
            console.log("Startup is already running , starting, or started.");
            return false;
        }

        if (this.startupCritEvents.has(eventName) || this.startupNoCritEvents.has(eventName)) {
            console.log(`Event "${eventName}" already exists. Use updateStartEvent to override.`);
            return false;
        }

        // Nested ternary to set in correct map and as correct type if onFail provided
        critical ? this.startupCritEvents.set(eventName, 
            onFail ? 
            { runner: runner, onFail: onFail } : runner) 
            : this.startupNoCritEvents.set(eventName, 
                onFail ? 
                { runner: runner, onFail: onFail } 
                : runner);
        if (this.status == "empty" && this.__isReady()) this.status = "ready";
        return true;
    }

    public updateStartupEvent(eventName: string, critical: boolean, runner: () => Promise<boolean>) {

        if (this.status == "running" || this.status == "starting" || this.status == "started") {
            console.log("Startup is already running , starting, or started.");
            return false;
        }

        critical ? this.startupCritEvents.set(eventName, runner) : this.startupNoCritEvents.set(eventName, runner);
        if (this.status == "empty" && this.__isReady()) this.status = "ready";
        return true;
    }

    public removeStartupEvent(eventName: string) {

        if (this.status == "running" || this.status == "starting" || this.status == "started") {
            console.log("Startup is already running , starting, or started.");
            return false;
        }

        if (this.startupCritEvents.has(eventName)) {
            this.startupCritEvents.delete(eventName);
            return true;
        }

        if (this.startupNoCritEvents.has(eventName)) {
            this.startupNoCritEvents.delete(eventName);
            if (this.status == "ready" && !this.__isReady()) this.status = "empty";
            return true;
        }

        console.log(`Event ${eventName} is not registered.`);
        return false;
    }

    public onReady(starter: () => void) {
        if (this.status == "running" || this.status == "starting" || this.status == "started") {
            console.log("Startup is already running , starting, or started.");
            return false;
        }

        this.starter = starter;
        if (this.status == "empty" && this.__isReady()) this.status = "ready";
        return true;
    }

    private __isReady() {
        return (this.startupCritEvents.size > 0 || this.startupNoCritEvents.size > 0) && this.starter;
    }

    public async run() {

        if (this.status != "ready") {
            console.log("Status is not ready. Unable to run.");
            return;
        }
        this.status = "running";

        const runnables: (() => Promise<boolean>)[] = [];
        this.startupCritEvents.forEach((value, key) => {
            const runnable = async () => {
                if ("runner" in value) {
                    const result = await value.runner();
                    if (!result) {
                        await value.onFail();
                        console.log(`[Startup]: Critical failure for event ${key}. Aborting startup.`);
                    }
                    return result;
                } else {
                    const result = await value();
                    if (!result) {
                        console.log(`[Startup]: Critical failure for event ${key}. Aborting startup.`)
                    }
                    return result;
                }

            };
            runnables.push(runnable);
        });

        this.startupNoCritEvents.forEach((value, key) => {
            const runnable = async () => {
                if ("runner" in value) {
                    const result = await value.runner();
                    if (!result) {
                        await value.onFail();
                        console.log(`[Startup]: Failure for event ${key}. Some features may not be available without a restart.`);
                    }
                } else {
                    const result = await value();
                    if (!result) {
                        console.log(`[Startup]: Failure for event ${key}. Some features may not be available without a restart.`)
                    }
                }
                return true;
            };
            runnables.push(runnable);
        });

        const results = await Promise.all(runnables.map(runnable => runnable()));
        for (const result of results) {
            if (!result) {
                console.log("[Startup]: One or more critical failures occured during startup. Aborting startup.");
                exit(1); //TODO: Replace with shutdown
            }
        }

        this.starter!(); // We already checked for its existence
    }
}

function init() {
    let instance = new Startup();

    const startupEventFiles = readdirSync(join(__dirname, `./startup_commands`)).filter(file => file.endsWith('.js'));
    for (const file of startupEventFiles) {
        try {
            console.log(`[Startup]: Reading event from file ${file}`);
            let path = join(__dirname, `./startup_events/${file}`);
            const event = (require(path)).default as IStartupEvent;
            instance.addStartupEvent(event.event, event.critical, event.runner, event.onFail);
            console.log(`[Startup]: Added event from file ${file}`);
        } catch (err) {
            console.log(`[Startup]: Failed to add event from file ${file}`);
        }
    }

    return instance;
}

const instance = init();

export default instance;