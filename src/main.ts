import { Client, GatewayIntentBits, Events, ActivityType } from "discord.js";
import { config } from "dotenv";
import { fork } from "child_process";
import { exit } from "process";

import { initSlashCommands, handleSlashCommandFactory } from "./util/handlers";

// const {
//   Handlers,
//   readCommands,
//   readStringSelectMenus,
//   readButtons,
//   readModals,
// } = require("./util");
//const process = require("process");

config();
const TOKEN = process.env.TOKEN;

const SQL = {
  user: process.env.PROD_MSSQL_USER,
  password: process.env.PROD_MSSQL_PASSWORD,
  database: process.env.PROD_MSSQL_DATABASE,
  server: process.env.PROD_MSSQL_SERVER,
  pool: {
    max: 10,
    min: 2,
    idleTimeoutMillis: Number.MAX_SAFE_INTEGER,
  },
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

/*
 *	Launch a second process executing deploy-commands.js to ensure all
 *	commands are up to date on Discord's end
 */
fork("./deploy-commands.js");

// Holy crap that's a lot of intention :flushed:
const intent_flags = [
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

var client = new Client({ intents: intent_flags });
if (!client) exit(1);

const slashCommands = initSlashCommands(client);
if (slashCommands === undefined) exit(1);
const slashCommandHandler = handleSlashCommandFactory(slashCommands)

// Read commands and interactable components into the bot's main memory
// client = readCommands(client);
// const btnCommands = readButtons();
// const smCommands = readStringSelectMenus();
// const modalInteractions = readModals();

// const knownInteractions = {
//   commands: client.commands,
//   stringSelects: smCommands,
//   buttons: btnCommands,
//   modals: modalInteractions,
// };

/**
 * Bot's listeners
 */
client.on(Events.ClientReady, () => {
  let user = client.user;
  if (!user) exit(1);
  user.setActivity('Discord', {type: ActivityType.Playing});
  console.log("Bot Ready.");
});

// On joining a new Discord server
client.on(Events.GuildCreate, async (guild) => {
  try {
    Handlers.onGuildCreate(guild, db.con);
  } catch (err) {
    console.log(err);
    return;
  }
});

// Events to handle on users joining/moving channels
client.on(Events.VoiceStateUpdate, async (oldState, newState) => {
  try {
    Handlers.onVoiceStateUpdate(oldState, newState, db);
  } catch (err) {
    console.log(err);
    return;
  }
});

// Command Handling
client.on(Events.InteractionCreate, async (interaction) => {
  try {
    slashCommandHandler(interaction);
  } catch (err) {
    console.log(err);
    return;
  }
});

client.login(TOKEN);
