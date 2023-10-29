import { Client, Events, VoiceState } from "discord.js";
import { IEventHandler } from "../../types/event_handler";

const eventHandler: IEventHandler = {
    event: Events.Warn,
    handlerFactory(client, checkPerms) {
        return async (oldState: VoiceState, newState: VoiceState) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;