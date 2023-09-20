import { readdirSync } from "fs";
import { join } from "path";
import { AnySelectMenuInteraction, Client, Collection, Events, Interaction } from "discord.js";
import { ICommand, ISelectMenu } from "../../types/discord_interactions";

function init(client: Client) {

    if (!client.isReady()) return;

    const selectMenus = new Collection<String, ISelectMenu>();
    const commandFiles = readdirSync(join(__dirname, "../../selectmenus")).filter(file => file.endsWith(".js"));
    
    for (const file of commandFiles) {

        const cmd: ISelectMenu = require(file) as ISelectMenu;
        try {
            let customId = cmd.data.toJSON().custom_id
            console.log(`[Select Menus]: Reading select menu ${customId}`);
            selectMenus.set(customId, cmd)
        } catch (error) {
            console.log(`[Select Menus]: Error in file ${file}`);
            continue;
        }

        
    };

    return selectMenus;
}

function handlerFactory(slashCommands: Collection<String, ISelectMenu>) {

    return async (interaction: Interaction) => {
        if (!interaction.isAnySelectMenu()) return
        let cmdInteraction: AnySelectMenuInteraction = interaction;
        let cmd: ISelectMenu | undefined = slashCommands.get(cmdInteraction.id);
        if (cmd === undefined) return;
        await cmd.execute(cmdInteraction); 
    } 
}

const discordEvent = Events.InteractionCreate

export default { 
    discordEvent,
    init, 
    handlerFactory 
};

export {
    discordEvent,
    init,
    handlerFactory,
}