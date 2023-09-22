import { AnySelectMenuInteraction, ButtonBuilder, ButtonInteraction, ChannelSelectMenuBuilder, ChatInputCommandInteraction, RoleSelectMenuBuilder, SlashCommandBuilder, StringSelectMenuBuilder, UserSelectMenuBuilder } from "discord.js"

export enum ICommandPermission {
    ALL
}
export type ICommandExecute = (interaction: ChatInputCommandInteraction) => Promise<void>
export type ICommand = {
    data: SlashCommandBuilder,
    execute: ICommandExecute,
    permissions: ICommandPermission
}

export type ISelectMenuExecute = (interaction: AnySelectMenuInteraction, idArgs: String[]) => Promise<void>;
export type ISelectMenu = {
    customId: String,
    execute: ISelectMenuExecute,
    permissions: ICommandPermission,
    selectMenu: (... args) => RoleSelectMenuBuilder | UserSelectMenuBuilder | StringSelectMenuBuilder | ChannelSelectMenuBuilder
}

export type IButtonExecute = (interaction: ButtonInteraction, idArgs: String[]) => Promise<void>;
export type IButton = {
    customId: String,
    execute: IButtonExecute,
    permissions: ICommandPermission,
    button: (... args) => ButtonBuilder
}
