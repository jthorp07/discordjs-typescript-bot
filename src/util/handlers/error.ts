import { Events } from "discord.js";
import { IEventHandler } from "../../types/event_handler";

const errorEventHandler: IEventHandler = {
    event: Events.Error,
    handlerFactory(client, checkPerms) {
        return async (error: Error) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default errorEventHandler;