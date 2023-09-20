import { Events, VoiceState } from "discord.js";

function handlerFactory() {
    return async (oldState: VoiceState, newState: VoiceState) => {
        // TODO: Implement
    };
}

export default {
    discordEvent: Events.VoiceStateUpdate,
    handlerFactory
}

