import { Client, Collection, Events } from "discord.js";
import { IEventHandler } from "../types/event_handler";
import { readdirSync } from "fs";
import { join } from "path"


export const setEventHandlers = (client: Client) => {

    if (!client.isReady()) return;

    const eventHandlers = new Collection<String, IEventHandler>();
    const commandFiles = readdirSync(join(__dirname, "./handlers")).filter(file => file.endsWith(".js"));

    for (const file of commandFiles) {

        const handler: IEventHandler = require(file) as IEventHandler;
        const onEvent = handler.handlerFactory(client);
        try {
            console.log(`[Handlers]: Reading event handler for ${handler.event.toString()}`);
            client.on(handler.event.toString(), onEvent);
        } catch (error) {
            console.log(`[Handlers]: Error in file ${file}`);
            continue;
        }
    };

    return eventHandlers;
}