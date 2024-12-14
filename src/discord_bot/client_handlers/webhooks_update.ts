import { Events, ForumChannel, NewsChannel, StageChannel, TextChannel, VoiceChannel } from "discord.js";
import { IDiscordClientEventHandler } from "../../adapter_types/bot_client_event_handler";

const eventHandler: IDiscordClientEventHandler = {
    event: Events.WebhooksUpdate,
    handlerFactory(client, checkPerms) {
        return async (channel: TextChannel|NewsChannel|VoiceChannel|StageChannel|ForumChannel) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;