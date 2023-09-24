import { Collection, Interaction } from "discord.js";
import { ICommandPermission } from "../types/discord_interactions";

export function initPerms() {

    const permMap = new Collection<ICommandPermission, (interaction: Interaction) => Promise<boolean>>;

    permMap.set(ICommandPermission.ALL, async (interaction) => {
        return true;
    });

    return async (permissionLevel: ICommandPermission, interaction: Interaction) => {
        let permChecker = permMap.get(permissionLevel);
        if (!permChecker) return false;
        return await permChecker(interaction);
    }
}