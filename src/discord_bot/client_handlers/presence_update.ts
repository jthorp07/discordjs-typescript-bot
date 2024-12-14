import { Events, Presence } from "discord.js";
import { IDiscordClientEventHandler } from "../../adapter_types/bot_client_event_handler";

const eventHandler: IDiscordClientEventHandler = {
    event: Events.PresenceUpdate,
    handlerFactory(client, checkPerms) {
        return async (oldPresence: Presence|undefined, newPresence: Presence) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;