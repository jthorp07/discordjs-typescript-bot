import { DMChannel, Events, GuildChannel } from "discord.js";
import { IDiscordClientEventHandler } from "../../adapter_types/bot_client_event_handler";

const eventHandler: IDiscordClientEventHandler = {
    event: Events.ChannelDelete,
    handlerFactory(client, checkPerms) {
        return async (channel: GuildChannel | DMChannel) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;