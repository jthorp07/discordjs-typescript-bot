import { Events, Guild } from "discord.js";
import { IEventHandler } from "../../types/event_handler";

const guildCreateEventHandler: IEventHandler = {
    event: Events.GuildCreate,
    handlerFactory(client, checkPerms) {
        return async (guild: Guild) => {
            // TODO: Implement
            return;
        }
    },
}