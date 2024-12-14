import { Events, Interaction } from "discord.js";
import { IDiscordClientEventHandler } from "../../adapter_types/bot_client_event_handler";

const eventHandler: IDiscordClientEventHandler = {
    event: Events.InteractionCreate,
    handlerFactory(client, checkPerms) {
        return async (interaction: Interaction) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;