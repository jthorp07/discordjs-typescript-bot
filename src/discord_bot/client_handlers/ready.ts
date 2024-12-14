import { ActivityType, Events } from "discord.js";
import { IDiscordClientEventHandler } from "../../adapter_types/bot_client_event_handler";
import { instance as logger } from "../../bot_systems/logger/logger";
import { LogTarget } from "../../adapter_types/logging";

const eventHandler: IDiscordClientEventHandler = {
    event: Events.ClientReady,
    handlerFactory: (client) => {
        return async () => {
            client.user?.setActivity("over your Discord server!", {
                type: ActivityType.Watching,
            });
            logger.log("Startup complete. Bot online.", LogTarget.Info, "Bot");
        }
    },
    useHandler: true,
}

export default eventHandler;