import { Events, StageInstance } from "discord.js";
import { IDiscordClientEventHandler } from "../../adapter_types/bot_client_event_handler";

const eventHandler: IDiscordClientEventHandler = {
    event: Events.StageInstanceUpdate,
    handlerFactory(client, checkPerms) {
        return async (oldStageInstance: StageInstance|undefined, newStageInstance: StageInstance) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;