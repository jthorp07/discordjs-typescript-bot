import { Events, GuildMember } from "discord.js";
import { IEventHandler } from "../../types/event_handler";

const eventHandler: IEventHandler = {
    event: Events.GuildMemberAdd,
    handlerFactory(client, checkPerms) {
        return async (member: GuildMember) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;