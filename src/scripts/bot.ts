import { Client, GatewayIntentBits, Collection, Interaction } from "discord.js";
import { exit } from "process";
import { initPerms } from "../bot_systems/permissions/permissions";
import { instance as logger } from "../bot_systems/logger/logger";
import { LogTarget } from "../adapter_types/logging";
import { readdirSync } from "fs";
import { join } from "path";
import { IDiscordClientEventHandler } from "../adapter_types/bot_client_event_handler";
import { ICommandPermission } from "../adapter_types/discord_interactions";
import { startupTaskManager } from "../bot_systems/bot_events/async_task_manager";

/**
 * Main bot script body
 */

const TOKEN = process.env.TOKEN || "NO_TOKEN_PROVIDED";
const USE_CUSTOM_PERMS = process.env.USE_CUSTOM_PERMISSIONS === "TRUE" ? true : false;

// Holy crap that's a lot of intention :flushed:
const INTENT_FLAGS = [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.GuildVoiceStates,
];

startupTaskManager.setOnTasksFinished(async () => {
    const client = createBotClient();
    const customPerms = USE_CUSTOM_PERMS ? initPerms() : undefined;
    setClientEventHandlers(client, customPerms);
    client.login(TOKEN);
});

startupTaskManager.runTasks();

/**
 * Local functions for main bot script.
 * 
 * Note these functions are required to run AFTER the bot client is instantiated, therefore they
 * cannot be moved to the startup module.
 */

/**
 * Reads in event handlers from the handlers directory and sets them up on the client.
 * 
 * @param client Active bot client
 * @param checkPerms Optional function to check permissions
 */
function setClientEventHandlers(client: Client, checkPerms?: (permissionLevel: ICommandPermission, interaction: Interaction) => Promise<boolean>) {

    if (!client) return;
    const eventHandlers = new Collection<String, IDiscordClientEventHandler>();
    const handlerFiles = readdirSync(join(__dirname, "handlers")).filter(file => file.endsWith(".js"));
    for (const file of handlerFiles) {
        try {
            const handler = require(join(__dirname, `./handlers/${file}`)).default as IDiscordClientEventHandler;
            if (!handler.useHandler) continue;
            const onEvent = handler.handlerFactory(client, checkPerms);
            logger.log(`Reading event handler for ${handler.event}.`, LogTarget.Info, "Handlers");
            client.on(handler.event.toString(), onEvent);
            logger.log(`Handler set for event ${handler.event.toString()}.`, LogTarget.Info, "Handlers");
        } catch (error) {
            logger.log(`Error in file ${file}`, LogTarget.Error, "Handlers");
            continue;
        }
    };
    return eventHandlers;
}

function createBotClient() {
    const client = new Client({ intents: INTENT_FLAGS });
    if (!client) {
        logger.log("Failed to instantiate client.", LogTarget.Error, "Bot");
        exit(1);
    }
    return client;
}