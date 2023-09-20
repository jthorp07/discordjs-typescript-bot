import { ActivityType, Client, Events } from "discord.js";

function init(client: Client) {
    //Do nothing
    return;
}

function handlerFactory() {
    return async (client: Client) => {
        client.user?.setActivity("Discord", {type: ActivityType.Playing});
        console.log("[Startup]: Finished");
    }
}

const discordEvent = Events.ClientReady;