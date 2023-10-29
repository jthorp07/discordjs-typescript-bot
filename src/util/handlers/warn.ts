import { Events } from "discord.js";
import { IEventHandler } from "../../types/event_handler";

const eventHandler: IEventHandler = {
    event: Events.Warn,
    handlerFactory(client, checkPerms) {
        return async (info: string) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;