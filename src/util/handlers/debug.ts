import { Events } from "discord.js";
import { IEventHandler } from "../../types/event_handler";

const debugEventHandler: IEventHandler = {
    event: Events.Debug,
    handlerFactory(client, checkPerms) {
        return async (info: string) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default debugEventHandler;