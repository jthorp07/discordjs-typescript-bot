import { Events } from "discord.js";
import { IDiscordClientEventHandler } from "../../adapter_types/bot_client_event_handler";

const eventHandler: IDiscordClientEventHandler = {
    event: Events.GuildMembersChunk,
    handlerFactory(client, checkPerms) {
        return async (members, guild, chunk) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;