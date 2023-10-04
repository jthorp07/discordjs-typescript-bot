import { Events, Guild, GuildAuditLogsEntry } from "discord.js";
import { IEventHandler } from "../../types/event_handler";

const guildAuditLogEntryCreateEventHandler: IEventHandler = {
    event: Events.GuildAuditLogEntryCreate,
    handlerFactory(client, checkPerms) {
        return async (auditLogEntry: GuildAuditLogsEntry, guild: Guild) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default guildAuditLogEntryCreateEventHandler;