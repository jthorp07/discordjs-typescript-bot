import { Events } from "discord.js";
import { IDiscordClientEventHandler } from "../../adapter_types/bot_client_event_handler";

const eventHandler: IDiscordClientEventHandler = {
    event: Events.ShardReconnecting,
    handlerFactory(client, checkPerms) {
        return async (id: number) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;