import { Events, Guild, GuildEmoji } from "discord.js";
import { IEventHandler } from "../../types/event_handler";

const emojiUpdateEventHandler: IEventHandler = {
    event: Events.GuildEmojiUpdate,
    handlerFactory(client, checkPerms) {
        return async (oldEmoji: GuildEmoji, newEmoji: GuildEmoji) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default emojiUpdateEventHandler;