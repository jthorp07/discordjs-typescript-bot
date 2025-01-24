import { Events } from "discord.js";
import { IDiscordClientEventHandler } from "../../adapter_types/bot_client_event_handler";

const eventHandler: IDiscordClientEventHandler = {
    event: Events.GuildAuditLogEntryCreate,
    handlerFactory(client, checkPerms) {
        return async (auditLogEntry, guild) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;