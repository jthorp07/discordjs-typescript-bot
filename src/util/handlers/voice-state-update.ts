import { Client, Events, VoiceState } from "discord.js";
import { IEventHandler } from "../../types/event_handler";

function handlerFactory(client: Client) {
    return async (oldState: VoiceState, newState: VoiceState) => {
        // TODO: Implement
    };
}

const voiceStateUpdateEventHandler: IEventHandler = {
    event: Events.VoiceStateUpdate,
    handlerFactory: handlerFactory,
}

export default voiceStateUpdateEventHandler;

