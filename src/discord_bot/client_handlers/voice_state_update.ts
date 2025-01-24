import { Events } from "discord.js";
import { IDiscordClientEventHandler } from "../../adapter_types/bot_client_event_handler";

const eventHandler: IDiscordClientEventHandler = {
    event: Events.VoiceStateUpdate,
    handlerFactory(client, checkPerms) {
        return async (oldState, newState) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;