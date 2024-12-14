import { Events, ThreadChannel } from "discord.js";
import { IDiscordClientEventHandler } from "../../adapter_types/bot_client_event_handler";

const eventHandler: IDiscordClientEventHandler = {
    event: Events.ThreadUpdate,
    handlerFactory(client, checkPerms) {
        return async (oldThread: ThreadChannel, newThread: ThreadChannel) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;