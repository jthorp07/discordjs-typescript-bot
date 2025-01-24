import { Events, Message } from "discord.js";
import { IDiscordClientEventHandler } from "../../adapter_types/bot_client_event_handler";

const eventHandler: IDiscordClientEventHandler = {
    event: Events.MessageCreate,
    handlerFactory(client, checkPerms) {
        return async (message) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;