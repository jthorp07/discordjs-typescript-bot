import { Events, GuildScheduledEvent } from "discord.js";
import { IDiscordClientEventHandler } from "../../adapter_types/bot_client_event_handler";

const eventHandler: IDiscordClientEventHandler = {
    event: Events.GuildScheduledEventUpdate,
    handlerFactory(client, checkPerms) {
        return async (oldEvent: GuildScheduledEvent, newEvent: GuildScheduledEvent) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;