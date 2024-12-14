import { Events, Guild } from "discord.js";
import { IDiscordClientEventHandler } from "../../adapter_types/bot_client_event_handler";

const eventHandler: IDiscordClientEventHandler = {
    event: Events.GuildAvailable,
    handlerFactory(client, checkPerms) {
        return async (guild: Guild) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;