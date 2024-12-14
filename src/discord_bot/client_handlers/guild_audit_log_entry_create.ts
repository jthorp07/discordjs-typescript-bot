import { Events, Guild, GuildAuditLogsEntry } from "discord.js";
import { IDiscordClientEventHandler } from "../../adapter_types/bot_client_event_handler";

const eventHandler: IDiscordClientEventHandler = {
    event: Events.GuildAuditLogEntryCreate,
    handlerFactory(client, checkPerms) {
        return async (auditLogEntry: GuildAuditLogsEntry, guild: Guild) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;