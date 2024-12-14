import { Events, GuildScheduledEvent } from "discord.js";
import { IDiscordClientEventHandler } from "../../adapter_types/bot_client_event_handler";

const eventHandler: IDiscordClientEventHandler = {
    event: Events.GuildScheduledEventCreate,
    handlerFactory(client, checkPerms) {
        return async (event: GuildScheduledEvent) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;