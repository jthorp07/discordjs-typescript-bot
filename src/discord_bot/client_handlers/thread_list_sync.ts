import { Collection, Events, Guild, Snowflake, ThreadChannel } from "discord.js";
import { IDiscordClientEventHandler } from "../../adapter_types/bot_client_event_handler";

const eventHandler: IDiscordClientEventHandler = {
    event: Events.ThreadListSync,
    handlerFactory(client, checkPerms) {
        return async (threads: Collection<Snowflake, ThreadChannel>, guild: Guild) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;