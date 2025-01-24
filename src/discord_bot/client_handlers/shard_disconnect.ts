import { Events } from "discord.js";
import { IDiscordClientEventHandler } from "../../adapter_types/bot_client_event_handler";

const eventHandler: IDiscordClientEventHandler = {
    event: Events.ShardDisconnect,
    handlerFactory(client, checkPerms) {
        return async (event, id) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;