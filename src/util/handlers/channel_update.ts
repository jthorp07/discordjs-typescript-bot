import { DMChannel, Events, GuildChannel } from "discord.js";
import { IEventHandler } from "../../types/event_handler";

const channelUpdateEventHandler: IEventHandler = {
    event: Events.ChannelUpdate,
    handlerFactory(client, checkPerms) {
        return async (oldChannel: GuildChannel | DMChannel, newChannel: GuildChannel | DMChannel) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default channelUpdateEventHandler;