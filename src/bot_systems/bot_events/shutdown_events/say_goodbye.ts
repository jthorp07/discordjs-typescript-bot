import { IAsyncBotTask } from "../../../adapter_types/async_bot_task";

const eventName = "say_goodbye" as const;
const event: IAsyncBotTask = {
    taskName: eventName,
    runner: async () => {
        console.log("Goodbye!");
        return true;
    },
    useTask: true,
}

export default event;