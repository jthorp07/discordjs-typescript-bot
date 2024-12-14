import { Events, Invite } from "discord.js";
import { IDiscordClientEventHandler } from "../../adapter_types/bot_client_event_handler";

const eventHandler: IDiscordClientEventHandler = {
    event: Events.InviteDelete,
    handlerFactory(client, checkPerms) {
        return async (invite: Invite) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;