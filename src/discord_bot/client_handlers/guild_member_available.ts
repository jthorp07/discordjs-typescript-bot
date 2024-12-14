import { Events, GuildMember } from "discord.js";
import { IDiscordClientEventHandler } from "../../adapter_types/bot_client_event_handler";

const eventHandler: IDiscordClientEventHandler = {
    event: Events.GuildMemberAvailable,
    handlerFactory(client, checkPerms) {
        return async (member: GuildMember) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;