import { Events, GuildEmoji } from "discord.js";
import { IEventHandler } from "../../types/event_handler";

const emojiDeleteEventHandler: IEventHandler = {
    event: Events.GuildEmojiDelete,
    handlerFactory(client, checkPerms) {
        return async (emoji: GuildEmoji) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default emojiDeleteEventHandler;