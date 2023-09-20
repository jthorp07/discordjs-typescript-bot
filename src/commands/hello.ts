import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { ICommand, ICommandPermission } from "../types/discord_interactions";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hello')
        .setDescription('Says hello')
        .addStringOption(option =>
            option.setName('stringone')
                .setDescription('a string')
                .setRequired(true)) as SlashCommandBuilder,
    async execute(interaction: ChatInputCommandInteraction) {

        let stringoption = interaction.options.getString('stringone');
        console.log(stringoption);
        await interaction.reply({content: `\`\`\`Hello ${stringoption}\`\`\``});
    },
    permissions: ICommandPermission.ALL
} as ICommand;