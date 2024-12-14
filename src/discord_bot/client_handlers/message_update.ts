import { Events, Message } from "discord.js";
import { IDiscordClientEventHandler } from "../../adapter_types/bot_client_event_handler";

const eventHandler: IDiscordClientEventHandler = {
    event: Events.MessageUpdate,
    handlerFactory(client, checkPerms) {
        return async (oldMessage: Message, newMessage: Message) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;