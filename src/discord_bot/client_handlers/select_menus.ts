import { readdirSync } from "fs";
import { join } from "path";
import { AnySelectMenuInteraction, Collection, Events } from "discord.js";
import { ISelectMenu } from "../../adapter_types/discord_interactions";
import { IDiscordClientEventHandler } from "../../adapter_types/bot_client_event_handler";
import { instance as logger } from "../../bot_systems/logger/logger";
import { LogTarget } from "../../adapter_types/logging";

const path = join(__dirname, '../../selectmenus')
const eventHandler: IDiscordClientEventHandler = {
    event: Events.InteractionCreate,
    handlerFactory: (ignored, permCheck) => {
        const selectMenus = new Collection<String, ISelectMenu>();
        const files = (() => {
            try {
                return readdirSync(path).filter(file => file.endsWith(".js"));
            } catch (err) {
                return [];

            }
        }).call(this);
        if (files.length == 0) return async (interaction) => {
            if (!interaction.isAnySelectMenu()) return;
            await interaction.reply({ content: `Something went wrong, and select menus cannot be handled at the moment. Please report this to a staff member.` });
        }

        for (const file of files) {

            const cmd = require(join(__dirname, `../../selectmenus/${file}`)) as { default: ISelectMenu };
            try {
                logger.log(`Reading select menu ${cmd.default.customId}`, LogTarget.Info, "SelectMenus");
                selectMenus.set(cmd.default.customId, cmd.default)
            } catch (error) {
                logger.log(`Error in file ${file}`, LogTarget.Error, "SelectMenus");
                continue;
            }
        };
        return async (interaction) => {
            if (!interaction.isAnySelectMenu()) return
            let cmdInteraction: AnySelectMenuInteraction = interaction;
            let idArgs = cmdInteraction.customId.split(':');
            if (!idArgs || idArgs.length === 0) {
                logger.log(`Select menu idArgs parsing error for ID ${cmdInteraction.customId}`, LogTarget.Error, "SelectMenus");
                return;
            }
            const cmd: ISelectMenu | undefined = selectMenus?.get(idArgs[0]);

            if (cmd === undefined) {
                await interaction.reply({ content: "Unknown interaction. If a command or component generated by JerryBot generated this response, please report it!" })
                return;
            }

            if (permCheck) {
                let authenticated = await permCheck(cmd.permissions, interaction);
                if (!authenticated) {
                    await interaction.editReply({ content: "You do not have the right permissions to use this selectmenu!" });
                    return;
                }
            } 

            await cmd.execute(cmdInteraction, []);
        }
    },
    useHandler: true,
}

export default eventHandler;