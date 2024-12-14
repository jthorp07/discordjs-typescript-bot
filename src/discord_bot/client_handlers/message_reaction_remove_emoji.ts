import { Events, MessageReaction } from "discord.js";
import { IDiscordClientEventHandler } from "../../adapter_types/bot_client_event_handler";

const eventHandler: IDiscordClientEventHandler = {
    event: Events.MessageReactionRemoveEmoji,
    handlerFactory(client, checkPerms) {
        return async (reaction: MessageReaction) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;