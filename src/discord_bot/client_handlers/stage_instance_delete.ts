import { Events, StageInstance } from "discord.js";
import { IDiscordClientEventHandler } from "../../adapter_types/bot_client_event_handler";

const eventHandler: IDiscordClientEventHandler = {
    event: Events.StageInstanceDelete,
    handlerFactory(client, checkPerms) {
        return async (stageInstance: StageInstance) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;