import { Events, Sticker } from "discord.js";
import { IDiscordClientEventHandler } from "../../adapter_types/bot_client_event_handler";

const eventHandler: IDiscordClientEventHandler = {
    event: Events.GuildStickerCreate,
    handlerFactory(client, checkPerms) {
        return async (sticker: Sticker) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;