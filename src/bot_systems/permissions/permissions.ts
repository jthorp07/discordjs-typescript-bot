import { Interaction } from "discord.js";
import { ICommandPermission } from "../../adapter_types/discord_interactions";
import { join } from "path";
import { instance as logger } from "../logger/logger";
import { LogTarget } from "../../adapter_types/logging";
import { readDirectoryToMap } from "../../algorithms/io";

/**
 * Reads in permissions data from the permission_levels directory and returns a closure
 * to authenticate interactions through the custom permissions system.
 * 
 * @returns Closure containing permissions data interfaced with with a function that takes in an interaction and returns a Promise<boolean> to authenticate the interaction.
 */
export function initPerms(): PermChecker {

    logger.log("Initializing permissions.", LogTarget.Info, "Permissions");
    const permsDirectory = "./permission_levels";
    const permMap = readDirectoryToMap<ICommandPermission, IPermission>(join(__dirname, permsDirectory), (item) => item.permLevel);
    return async (permissionLevel: ICommandPermission, interaction: Interaction) => {
        const permChecker = permMap.get(permissionLevel)?.permCheck;
        if (!permChecker) return false;
        return await permChecker(interaction);
    }
}

export type PermLevelCheck = (interaction: Interaction) => Promise<boolean>
export type PermChecker = (permissionLevel: ICommandPermission, interaction: Interaction) => Promise<boolean>
export type IPermission = {
    permLevel: ICommandPermission,
    permCheck: PermLevelCheck
};