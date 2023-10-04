import { readdirSync } from "fs";
import { join } from "path";
import { AnySelectMenuInteraction, Collection, Events, Interaction } from "discord.js";
import { ISelectMenu } from "../../types/discord_interactions";
import { IEventHandler } from "../../types/event_handler";


const selectMenuEventHandler: IEventHandler = {
    event: Events.InteractionCreate,
    handlerFactory: (ignored, permCheck) => {
        const selectMenus = new Collection<String, ISelectMenu>();
        const commandFiles = readdirSync(join(__dirname, "../../selectmenus")).filter(file => file.endsWith(".js"));

        for (const file of commandFiles) {

            const cmd = require(join(__dirname, `../../selectmenus/${file}`)) as { default: ISelectMenu };
            try {
                console.log(`[Select Menus]: Reading select menu ${cmd.default.customId}`);
                selectMenus.set(cmd.default.customId, cmd.default)
            } catch (error) {
                console.log(`[Select Menus]: Error in file ${file}`);
                continue;
            }
        };
        return async (interaction: Interaction) => {
            if (!interaction.isAnySelectMenu()) return
            let cmdInteraction: AnySelectMenuInteraction = interaction;
            let idArgs = cmdInteraction.customId.split(':');
            if (!idArgs || idArgs.length === 0) {
                console.error(`[Error]: Select menu idArgs parsing error for ID ${cmdInteraction.customId}`);
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

export default selectMenuEventHandler;