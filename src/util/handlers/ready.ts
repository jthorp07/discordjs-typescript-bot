import { ActivityType, Events } from "discord.js";
import { IDiscordEventHandler } from "../../types/event_handler";

const eventHandler: IDiscordEventHandler = {
    event: Events.ClientReady,
    handlerFactory: (client) => {
        return async () => {
            client.user?.setActivity('over your Discord server!', {
                type: ActivityType.Watching,
            });
            console.log('[Bot]: Ready')
        }
    },
    useHandler: true,
}

export default eventHandler;