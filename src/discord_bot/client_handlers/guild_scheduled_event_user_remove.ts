import { Events } from "discord.js";
import { IDiscordClientEventHandler } from "../../adapter_types/bot_client_event_handler";

const eventHandler: IDiscordClientEventHandler = {
    event: Events.GuildScheduledEventUserRemove,
    handlerFactory(client, checkPerms) {
        return async (event, user) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;