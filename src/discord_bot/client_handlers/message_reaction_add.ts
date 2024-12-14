import { Events, MessageReaction, User } from "discord.js";
import { IDiscordClientEventHandler } from "../../adapter_types/bot_client_event_handler";

const eventHandler: IDiscordClientEventHandler = {
    event: Events.MessageReactionAdd,
    handlerFactory(client, checkPerms) {
        return async (reaction: MessageReaction, user: User) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;