import { Collection, Events, Snowflake, ThreadChannel, ThreadMember } from "discord.js";
import { IDiscordClientEventHandler } from "../../adapter_types/bot_client_event_handler";

const eventHandler: IDiscordClientEventHandler = {
    event: Events.ThreadMembersUpdate,
    handlerFactory(client, checkPerms) {
        return async (addedMembers: Collection<Snowflake, ThreadMember>, removedMembers: Collection<Snowflake, ThreadMember>, thread: ThreadChannel) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;