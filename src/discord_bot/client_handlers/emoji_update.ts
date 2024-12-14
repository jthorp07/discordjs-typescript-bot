import { Events, GuildEmoji } from "discord.js";
import { IDiscordClientEventHandler } from "../../adapter_types/bot_client_event_handler";

const eventHandler: IDiscordClientEventHandler = {
    event: Events.GuildEmojiUpdate,
    handlerFactory(client, checkPerms) {
        return async (oldEmoji: GuildEmoji, newEmoji: GuildEmoji) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;