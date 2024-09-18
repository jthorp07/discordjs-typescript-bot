import { SlashCommandBuilder } from "discord.js";
import { ICommand, ICommandPermission } from "../types/discord_interactions";

export const command: ICommand = {
    data: new SlashCommandBuilder()
        .setName("subcmd")
        .setDescription("Testing subcommands")
        .addSubcommand(cmd => 
            cmd.setName("subone")
                .setDescription("the first subcommand")
                .addBooleanOption(option =>
                    option.setName("foo")
                        .setDescription("foo")
                        .setRequired(true)
                )
        ) as SlashCommandBuilder,
    execute: async (interaction) => {
        await interaction.deferReply({ ephemeral: true });
        const subcmd = interaction.options.getSubcommand(false);
        if (subcmd) {
            const res = interaction.options.getBoolean("foo", true);
            await interaction.editReply({ content: res ? "You said 'true'" : "You said 'false'" });
        } else {
            await interaction.editReply({ content: "You did not use the subcommand!" });
        }
    },
    permissions: ICommandPermission.ALL,
}