import { Events, ThreadChannel } from "discord.js";
import { IDiscordClientEventHandler } from "../../adapter_types/bot_client_event_handler";

const eventHandler: IDiscordClientEventHandler = {
    event: Events.ThreadDelete,
    handlerFactory(client, checkPerms) {
        return async (thread: ThreadChannel) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;