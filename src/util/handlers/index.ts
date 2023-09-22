import { Client, Collection } from "discord.js";
import { IEventHandler } from "../../types/event_handler";
import { readdirSync } from "fs";
import { join } from "path"


function init(client: Client) {

    if (!client.isReady()) return;

    const eventHandlers = new Collection<String, IEventHandler>();
    const commandFiles = readdirSync(join(__dirname, "../../selectmenus")).filter(file => file.endsWith(".js"));

    for (const file of commandFiles) {

        const handler: IEventHandler = require(file) as IEventHandler;
        try {
            console.log(`[Handlers]: Reading event handler for ${handler.event.toString()}`);
            
        } catch (error) {
            console.log(`[Select Menus]: Error in file ${file}`);
            continue;
        }
    };

    return selectMenus;
}