import { AutoModerationRule, Events } from "discord.js";
import { IDiscordClientEventHandler } from "../../adapter_types/bot_client_event_handler";

const eventHandler: IDiscordClientEventHandler = {
    event: Events.AutoModerationRuleDelete,
    handlerFactory(client, checkPerms) {
        return async (rule: AutoModerationRule) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;