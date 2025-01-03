import { Collection, Interaction } from "discord.js";
import { ICommandPermission } from "../../adapter_types/discord_interactions";
import { join } from "path";
import { readdirSync } from "fs";
import { instance as logger } from "../logger/logger";
import { LogTarget } from "../../adapter_types/logging";

/**
 * Reads in permissions data from the permission_levels directory and returns a closure
 * to authenticate interactions through the custom permissions system.
 * 
 * @returns Closure containing permissions data interfaced with with a function that takes in an interaction and returns a Promise<boolean> to authenticate the interaction.
 */
export function initPerms(): PermChecker {

    logger.log("Initializing permissions.", LogTarget.Info, "Permissions");
    const permMap = new Collection<ICommandPermission, PermLevelCheck>;
    const permsDirectory = "./permission_levels";

    const permFiles = readdirSync(join(__dirname, permsDirectory)).filter(file => file.endsWith(".js"));
    for (const file of permFiles) {
        logger.log(`Reading file ${file}`, LogTarget.Info, "Permissions");
        const perm = require(join(__dirname, `${permsDirectory}/${file}`)).default as IPermission;
        permMap.set(perm.permLevel, perm.permCheck);
    }

    return async (permissionLevel: ICommandPermission, interaction: Interaction) => {
        const permChecker = permMap.get(permissionLevel);
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