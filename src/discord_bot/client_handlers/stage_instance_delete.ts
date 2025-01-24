import { Events } from "discord.js";
import { IDiscordClientEventHandler } from "../../adapter_types/bot_client_event_handler";

const eventHandler: IDiscordClientEventHandler = {
    event: Events.StageInstanceDelete,
    handlerFactory(client, checkPerms) {
        return async (stageInstance) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;