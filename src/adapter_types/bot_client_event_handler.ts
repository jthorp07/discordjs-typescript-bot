import {
    ApplicationCommandPermissionsUpdateData, AutoModerationActionExecution, AutoModerationRule,
    Client, Events, GuildChannel, DMChannel, TextBasedChannels, GuildEmoji, Entitlement,
    GuildAuditLogsEntry, Guild, GuildBan, GuildMember, Collection, Snowflake, GuildMembersChunk,
    GuildScheduledEvent, User, BaseInteraction, Invite, Message, GuildTextBasedChannel, PollAnswer,
    MessageReaction, MessageReactionEventDetails, Presence, Role, Typing, VoiceState, StageInstance,
} from "discord.js";
import { PermChecker } from "../bot_systems/permissions/permissions";

type DiscordClientEventHandlerSignature = {
    event: Events.ApplicationCommandPermissionsUpdate,
    handlerFactory: (client: Client, checkPerms?: PermChecker) => (permUpdate: ApplicationCommandPermissionsUpdateData) => Promise<void>
} | {
    event: Events.AutoModerationActionExecution,
    handlerFactory: (client: Client, checkPerms?: PermChecker) => (actionExecution: AutoModerationActionExecution) => Promise<void>
} | {
    event: Events.AutoModerationRuleCreate | Events.AutoModerationRuleDelete | Events.AutoModerationRuleUpdate,
    handlerFactory: (client: Client, chechPerms?: PermChecker) => (rule: AutoModerationRule) => Promise<void>,
} | {
    event: Events.ChannelCreate,
    handlerFactory: (client: Client, checkPerms?: PermChecker) => (channel: GuildChannel) => Promise<void>
} | {
    event: Events.ChannelDelete,
    handlerFactory: (client: Client, checkPerms?: PermChecker) => (channel: GuildChannel | DMChannel) => Promise<void>
} | {
    event: Events.ChannelPinsUpdate,
    handlerFactory: (client: Client, checkPerms?: PermChecker) => (channel: TextBasedChannels, time: Date) => Promise<void>
} | {
    event: Events.ChannelUpdate,
    handlerFactory: (client: Client, checkPerms?: PermChecker) => (oldChannel: GuildChannel | DMChannel, newChannel: GuildChannel | DMChannel) => Promise<void>
} | {
    event: Events.Debug | Events.Warn,
    handlerFactory: (client: Client, checkPerms?: PermChecker) => (info: string) => Promise<void>
} | {
    event: Events.GuildEmojiCreate | Events.GuildEmojiDelete,
    handlerFactory: (client: Client, checkPerms?: PermChecker) => (emoji: GuildEmoji) => Promise<void>
} | {
    event: Events.GuildEmojiUpdate,
    handlerFactory: (client: Client, checkPerms?: PermChecker) => (oldEmoji: GuildEmoji, newEmoji: GuildEmoji) => Promise<void>
} | {
    event: Events.EntitlementCreate | Events.EntitlementDelete,
    handlerFactory: (client: Client, checkPerms?: PermChecker) => (entitlement: Entitlement) => Promise<void>
} | {
    event: Events.EntitlementUpdate,
    handlerFactory: (client: Client, checkPerms?: PermChecker) => (oldEntitlement: Entitlement | null, newEntitlement: Entitlement) => Promise<void>
} | {
    event: Events.Error,
    handlerFactory: (client: Client, checkPerms?: PermChecker) => (error: Error) => Promise<void>
} | {
    event: Events.GuildAuditLogEntryCreate,
    handlerFactory: (client: Client, checkPerms?: PermChecker) => (auditlogEntry: GuildAuditLogsEntry, guild: Guild) => Promise<void>
} | {
    event: Events.GuildAvailable | Events.GuildCreate | Events.GuildDelete | Events.GuildIntegrationsUpdate | Events.GuildUnavailable,
    handlerFactory: (client: Client, checkPerms?: PermChecker) => (guild: Guild) => Promise<void>
} | {
    event: Events.GuildUpdate,
    handlerFactory: (client: Client, checkPerms?: PermChecker) => (oldGuild: Guild, newGuild: Guild) => Promise<void>
} | {
    event: Events.GuildBanAdd | Events.GuildBanRemove,
    handlerFactory: (client: Client, checkPerms?: PermChecker) => (ban: GuildBan) => Promise<void>
} | {
    event: Events.GuildMemberAdd | Events.GuildMemberAvailable | Events.GuildMemberRemove,
    handlerFactory: (client: Client, checkPerms?: PermChecker) => (member: GuildMember) => Promise<void>
} | {
    event: Events.GuildMembersChunk,
    handlerFactory: (client: Client, checkPerms?: PermChecker) => (members: Collection<Snowflake, GuildMember>, guild: Guild, chunk: GuildMembersChunk) => Promise<void>
} | {
    event: Events.GuildMemberUpdate,
    handlerFactory: (client: Client, checkPerms?: PermChecker) => (oldMember: GuildMember, newMember: GuildMember) => Promise<void>
} | {
    event: Events.GuildScheduledEventCreate | Events.GuildScheduledEventDelete,
    handlerFactory: (client: Client, checkPerms?: PermChecker) => (event: GuildScheduledEvent) => Promise<void>
} | {
    event: Events.GuildScheduledEventUpdate,
    handlerFactory: (client: Client, checkPerms?: PermChecker) => (oldEvent: GuildScheduledEvent | null, newEvent: GuildScheduledEvent) => Promise<void>
} | {
    event: Events.GuildScheduledEventUserAdd | Events.GuildScheduledEventUserRemove,
    handlerFactory: (client: Client, checkPerms?: PermChecker) => (event: GuildScheduledEvent, user: User) => Promise<void>
} | {
    event: Events.InteractionCreate,
    handlerFactory: (client: Client, checkPerms?: PermChecker) => (interaction: BaseInteraction) => Promise<void>
} | {
    event: Events.InviteCreate | Events.InviteDelete,
    handlerFactory: (client: Client, checkPerms?: PermChecker) => (invite: Invite) => Promise<void>
} | {
    event: Events.MessageCreate | Events.MessageDelete,
    handlerFactory: (client: Client, checkPerms?: PermChecker) => (message: Message) => Promise<void>
} | {
    event: Events.MessageBulkDelete,
    handlerFactory: (client: Client, checkPerms?: PermChecker) => (messages: Collection<Snowflake, Message>, channel: GuildTextBasedChannel) => Promise<void>
} | {
    event: Events.MessagePollVoteAdd | Events.MessagePollVoteRemove,
    handlerFactory: (client: Client, checkPerms?: PermChecker) => (pollAnswer: PollAnswer, userId: Snowflake) => Promise<void>
} | {
    event: Events.MessageReactionAdd | Events.MessageReactionRemove,
    handlerFactory: (client: Client, checkPerms?: PermChecker) => (reaction: MessageReaction, user: User, details: MessageReactionEventDetails) => Promise<void>
} | {
    event: Events.MessageReactionRemoveAll,
    handlerFactory: (client: Client, checkPerms?: PermChecker) => (message: Message, reactions: Collection<(string | Snowflake), MessageReaction>) => Promise<void>
} | {
    event: Events.MessageReactionRemoveEmoji,
    handlerFactory: (client: Client, checkPerms?: PermChecker) => (reaction: MessageReaction) => Promise<void>
} | {
    event: Events.MessageUpdate,
    handlerFactory: (client: Client, checkPerms?: PermChecker) => (oldMessage: Message, newMessage: Message) => Promise<void>
} | {
    event: Events.PresenceUpdate,
    handlerFactory: (client: Client, checkPerms?: PermChecker) => (oldPresence: Presence | null, newPresence: Presence) => Promise<void>
} | {
    event: Events.ClientReady,
    handlerFactory: (client: Client, checkPerms?: PermChecker) => (client: Client) => Promise<void>
} | {
    event: Events.GuildRoleCreate | Events.GuildRoleDelete,
    handlerFactory: (client: Client, checkPerms?: PermChecker) => (role: Role) => Promise<void>
} | {
    event: Events.GuildRoleUpdate,
    handlerFactory: (client: Client, checkPerms?: PermChecker) => (oldRole: Role, newRole: Role) => Promise<void>
} | {
    event: Events.ShardDisconnect,
    handlerFactory: (client: Client, checkPerms?: PermChecker) => (event: CloseEvent, id: number) => Promise<void>
} | {
    event: Events.ShardError,
    handlerFactory: (client: Client, checkPerms?: PermChecker) => (error: Error, shardId: number) => Promise<void>
} | {
    event: Events.ShardReady,
    handlerFactory: (client: Client, checkPerms?: PermChecker) => (id: number, unavailableGuilds: Set<Snowflake> | null) => Promise<void>
} | {
    event: Events.ShardReconnecting,
    handlerFactory: (client: Client, checkPerms?: PermChecker) => (id: number) => Promise<void>
} | {
    event: Events.ShardResume,
    handlerFactory: (client: Client, checkPerms?: PermChecker) => (id: number, replayedEvents: number) => Promise<void>
} | {
    event: Events.StageInstanceCreate | Events.StageInstanceDelete,
    handlerFactory: (client: Client, checkPerms?: PermChecker) => (stageInstance: StageInstance) => Promise<void>
} | {
    event: Events.TypingStart,
    handlerFactory: (client: Client, checkPerms?: PermChecker) => (typing: Typing) => Promise<void>
} | {
    event: Events.UserUpdate,
    handlerFactory: (client: Client, checkPerms?: PermChecker) => (oldUser: User, newUser: User) => Promise<void>
} | {
    event: Events.VoiceStateUpdate,
    handlerFactory: (client: Client, checkPerms?: PermChecker) => (oldState: VoiceState, newState: VoiceState) => Promise<void>
};
export type IDiscordClientEventHandler = DiscordClientEventHandlerSignature & { useHandler: boolean };