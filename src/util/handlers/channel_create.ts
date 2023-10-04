import { Events, GuildChannel } from "discord.js";
import { IEventHandler } from "../../types/event_handler";

const channelCreateEventHandler: IEventHandler = {
    event: Events.ChannelCreate,
    handlerFactory(client, checkPerms) {
        return async (channel: GuildChannel) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default channelCreateEventHandler;