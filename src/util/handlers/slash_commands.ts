import { readdirSync } from "fs";
import { join } from "path";
import { ChatInputCommandInteraction, Client, Collection, Events, Interaction } from "discord.js";
import { ICommand } from "../../types/discord_interactions";

function init(client: Client) {

    if (!client.isReady()) return;

    const slashCommands = new Collection<String, ICommand>();
    const commandFiles = readdirSync(join(__dirname, "../../commands")).filter(file => file.endsWith(".js"));
    
    for (const file of commandFiles) {

        const cmd: ICommand = require(file) as ICommand;
        try {
            console.log(`[Slash Commands]: Reading command ${cmd.data.name}`);
            slashCommands.set(cmd.data.name, cmd)
        } catch (error) {
            console.log(`[Slash Commands]: Error in file ${file}`);
            continue;
        }

        
    };

    return slashCommands;
}

function handlerFactory(slashCommands: Collection<String, ICommand>) {

    return async (interaction: Interaction) => {
        if (!interaction.isChatInputCommand()) return
        let cmdInteraction: ChatInputCommandInteraction = interaction;
        let cmd: ICommand | undefined = slashCommands.get(cmdInteraction.id);
        if (cmd === undefined) return;
        await cmd.execute(cmdInteraction); 
    } 
}

const discordEvent = Events.InteractionCreate;

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