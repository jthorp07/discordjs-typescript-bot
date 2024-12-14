import { Collection, Events, GuildTextBasedChannel, Message, Snowflake } from "discord.js";
import { IDiscordClientEventHandler } from "../../adapter_types/bot_client_event_handler";

const eventHandler: IDiscordClientEventHandler = {
    event: Events.MessageBulkDelete,
    handlerFactory(client, checkPerms) {
        return async (messages: Collection<Snowflake, Message>, channel: GuildTextBasedChannel) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;