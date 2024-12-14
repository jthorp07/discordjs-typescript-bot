import { Events, ThreadChannel } from "discord.js";
import { IDiscordClientEventHandler } from "../../adapter_types/bot_client_event_handler";

const eventHandler: IDiscordClientEventHandler = {
    event: Events.ThreadCreate,
    handlerFactory(client, checkPerms) {
        return async (thread: ThreadChannel, newlyCreated: boolean) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;