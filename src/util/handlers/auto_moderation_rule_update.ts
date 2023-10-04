import { AutoModerationRule, Events } from "discord.js";
import { IEventHandler } from "../../types/event_handler";

const autoModerationRuleUpdateEventHandler: IEventHandler = {
    event: Events.AutoModerationRuleUpdate,
    handlerFactory(client, checkPerms) {
        return async (rule: AutoModerationRule) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default autoModerationRuleUpdateEventHandler;