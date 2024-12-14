import { Events } from "discord.js";
import { IDiscordClientEventHandler } from "../../adapter_types/bot_client_event_handler";

const eventHandler: IDiscordClientEventHandler = {
    event: Events.Debug,
    handlerFactory(client, checkPerms) {
        return async (info: string) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;