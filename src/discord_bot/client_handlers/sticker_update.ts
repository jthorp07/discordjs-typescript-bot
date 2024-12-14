import { Events, Sticker } from "discord.js";
import { IDiscordClientEventHandler } from "../../adapter_types/bot_client_event_handler";

const eventHandler: IDiscordClientEventHandler = {
    event: Events.GuildStickerUpdate,
    handlerFactory(client, checkPerms) {
        return async (oldSticker: Sticker, newSticker: Sticker) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;