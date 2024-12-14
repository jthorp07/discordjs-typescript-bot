import { Events, User } from "discord.js";
import { IDiscordClientEventHandler } from "../../adapter_types/bot_client_event_handler";

const eventHandler: IDiscordClientEventHandler = {
    event: Events.UserUpdate,
    handlerFactory(client, checkPerms) {
        return async (oldUser: User, newUser: User) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default eventHandler;