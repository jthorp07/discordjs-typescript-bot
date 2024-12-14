import { Events, Role } from "discord.js";
import { IDiscordClientEventHandler } from "../../adapter_types/bot_client_event_handler";

const eventHandler: IDiscordClientEventHandler = {
    event: Events.GuildRoleUpdate,
    handlerFactory(client, checkPerms) {
        return async (oldRole: Role, newRole: Role) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;