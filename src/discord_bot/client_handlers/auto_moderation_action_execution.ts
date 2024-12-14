import { AutoModerationActionExecution, Events } from "discord.js";
import { IDiscordClientEventHandler } from "../../adapter_types/bot_client_event_handler";

const eventHandler: IDiscordClientEventHandler = {
    event: Events.AutoModerationActionExecution,
    handlerFactory(client, checkPerms) {
        return async (actionExecution: AutoModerationActionExecution) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;