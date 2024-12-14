import { LogTarget } from "../../../adapter_types/logging";
import { IAsyncBotTask } from "../../../adapter_types/async_bot_task";
import { instance as logger } from "../../logger/logger";

const eventName = "wait_five_seconds" as const;
const event: IAsyncBotTask = {
    taskName: eventName,
    runner: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                logger.log("waited 5 seconds!", LogTarget.Info, "Wait5Sec");
                resolve(true);
            }, 5000);
        })
    },
    useTask: true,
}

export default event;