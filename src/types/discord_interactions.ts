import { AnySelectMenuInteraction, ChannelSelectMenuBuilder, ChatInputCommandInteraction, RoleSelectMenuBuilder, SlashCommandBuilder, StringSelectMenuBuilder, UserSelectMenuBuilder } from "discord.js"

export enum ICommandPermission {
    ALL
}
export type ICommandExecute = (interaction: ChatInputCommandInteraction) => Promise<void>
export type ICommand = {
    data: SlashCommandBuilder,
    execute: ICommandExecute,
    permissions: ICommandPermission
}

export type ISelectMenuExecute = (interaction: AnySelectMenuInteraction) => Promise<void>
export type ISelectMenu = {
    data: RoleSelectMenuBuilder | UserSelectMenuBuilder | StringSelectMenuBuilder | ChannelSelectMenuBuilder,
    execute: ISelectMenuExecute,
    permissions: ICommandPermission
}
