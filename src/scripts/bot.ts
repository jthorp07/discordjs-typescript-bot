import { Client, GatewayIntentBits, Collection, Interaction } from "discord.js";
import { exit } from "process";
import { initPerms } from "../bot_systems/permissions/permissions";
import { instance as logger } from "../bot_systems/logger/logger";
import { LogTarget } from "../adapter_types/logging";
import { join } from "path";
import { IDiscordClientEventHandler } from "../adapter_types/bot_client_event_handler";
import { ICommandPermission } from "../adapter_types/discord_interactions";
import { createTaskManager } from "../bot_systems/bot_tasks/async_task_manager";
import { readDirectoryThen } from "../algorithms/io";


const TOKEN = process.env.TOKEN || "NO_TOKEN_PROVIDED";
const USE_CUSTOM_PERMS = process.env.USE_CUSTOM_PERMISSIONS === "TRUE" ? true : false;

const STARTUP_TASK_DIR = "../bot_systems/bot_tasks/startup_events" as const;
const SHUTDOWN_TASK_DIR = "../bot_systems/bot_tasks/shutdown_events" as const;

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

const startupTaskManager = createTaskManager(STARTUP_TASK_DIR);
const shutdownTaskManager = createTaskManager(SHUTDOWN_TASK_DIR);

startupTaskManager.setOnTasksFinished(async () => {
    logger.log("Startup complete. Logging bot in.", LogTarget.Info, "Bot");
    
});

shutdownTaskManager.setOnTasksFinished(async () => {
    logger.log("All shutdown tasks finished. Shutting down.", LogTarget.Info, "Bot");
    exit(0);
});

// startupTaskManager.setOnTasksFinished(async () => {
//     const client = createBotClient();
//     const customPerms = USE_CUSTOM_PERMS ? initPerms() : undefined;
//     setClientEventHandlers(client, customPerms);
//     client.login(TOKEN);
// });

// startupTaskManager.runTasks();

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
    readDirectoryThen<IDiscordClientEventHandler>(join(__dirname, "handlers"), (handler) => {
        if (!handler.useHandler) return;
        const onEvent = handler.handlerFactory(client, checkPerms);
        client.on(handler.event.toString(), onEvent);
        logger.log(`Registered client event handler for ${handler.event} (${handler.event.toString()}).`, LogTarget.Info, "Handlers");
    });
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