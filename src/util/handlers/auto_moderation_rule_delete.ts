import { AutoModerationRule, Events } from "discord.js";
import { IEventHandler } from "../../types/event_handler";

const autoModerationRuleDeleteEventHandler: IEventHandler = {
    event: Events.AutoModerationRuleDelete,
    handlerFactory(client, checkPerms) {
        return async (rule: AutoModerationRule) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default autoModerationRuleDeleteEventHandler;