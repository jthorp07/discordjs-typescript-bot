import { Events } from "discord.js";
import { IDiscordClientEventHandler } from "../../adapter_types/bot_client_event_handler";

const eventHandler: IDiscordClientEventHandler = {
    event: Events.MessageReactionRemove,
    handlerFactory(client, checkPerms) {
        return async (reaction, user) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;