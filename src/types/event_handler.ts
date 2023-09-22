import { Client, Events } from "discord.js";

export type IEventHandler = {
    event: Events,
    handlerFactory: (client: Client) => (... args) => Promise<void>
}