import { ApplicationCommandPermissionsUpdateData, Events } from "discord.js";
import { IEventHandler } from "../../types/event_handler";

const applicationCommandPermissionUpdateEventHandler: IEventHandler = {
    event: Events.ApplicationCommandPermissionsUpdate,
    handlerFactory(client, checkPerms) {
        return async (permUpdate: ApplicationCommandPermissionsUpdateData) => {
            // TODO: Implement
            return;
        }
    },
    useHandler: false
}

export default applicationCommandPermissionUpdateEventHandler;