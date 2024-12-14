import { ICommandPermission } from "../../../adapter_types/discord_interactions";
import { IPermission } from "../permissions";

const permAll: IPermission = {
    permLevel: ICommandPermission.ALL,
    permCheck: async () => {
        return true;
    }
}

export default permAll;