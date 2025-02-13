import { SlashCommandBuilder } from "discord.js";
import { ICommand, ICommandPermission } from "../../../adapter_types/discord_interactions";

const command: ICommand = {
    data: new SlashCommandBuilder()
        .setName('hello')
        .setDescription('Says hello')
        .addStringOption(option => 
            option.setName('stringoption')
            .setDescription('A string option')
            .setRequired(true)
        ) as SlashCommandBuilder, // Adding an option changes the builder type to an option builder. It is safe to caste it back to SlashCommandBuilder.
    execute: async (interaction) => {
        let stringoption = interaction.options.getString('stringoption');
        await interaction.reply({content: `\`\`\`Hello ${stringoption}\`\`\``});
    },
    permissions: ICommandPermission.ALL
}

export default command;