import { Client, Collection, Events } from "discord.js";
import { IEventHandler } from "../types/event_handler";
import { readdirSync } from "fs";
import { join } from "path"


export const setEventHandlers = (client: Client) => {

    if (!client) return;

    const eventHandlers = new Collection<String, IEventHandler>();
    const handlerFiles = readdirSync(join(__dirname, "handlers")).filter(file => file.endsWith(".js"));

    for (const file of handlerFiles) {

        const handler = require(join(__dirname, `handlers/${file}`)).default as IEventHandler;
        const onEvent = handler.handlerFactory(client);
        
        try {
            console.log(`[Handlers]: Reading event handler for ${handler.event}.`);
            client.on(handler.event.toString(), onEvent);
        } catch (error) {
            console.log(`[Handlers]: Error in file ${file}`);
            continue;
        }
    };

    return eventHandlers;
}