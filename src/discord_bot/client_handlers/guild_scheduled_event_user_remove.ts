import { Events, GuildScheduledEvent, User } from "discord.js";
import { IDiscordClientEventHandler } from "../../adapter_types/bot_client_event_handler";

const eventHandler: IDiscordClientEventHandler = {
    event: Events.GuildScheduledEventUserRemove,
    handlerFactory(client, checkPerms) {
        return async (event: GuildScheduledEvent, user: User) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;