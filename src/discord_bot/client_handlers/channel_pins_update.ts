import { Events, TextBasedChannel } from "discord.js";
import { IDiscordClientEventHandler } from "../../adapter_types/bot_client_event_handler";

const eventHandler: IDiscordClientEventHandler = {
    event: Events.ChannelPinsUpdate,
    handlerFactory(client, checkPerms) {
        return async (channel: TextBasedChannel, time: Date) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;