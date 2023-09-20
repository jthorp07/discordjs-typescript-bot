import { Events } from "discord.js";

export type IEventArgs = [];

export interface IEventHandler {
    event: Events,
    eventArgs: IEventArgs,
    handlerFactory: () => (args: IEventArgs) => Promise<void>
}