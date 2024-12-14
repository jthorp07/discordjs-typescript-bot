import { Events } from "discord.js";
import { IDiscordClientEventHandler } from "../../adapter_types/bot_client_event_handler";

const eventHandler: IDiscordClientEventHandler = {
    event: Events.ShardError,
    handlerFactory(client, checkPerms) {
        return async (error: Error, shardId: number) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;