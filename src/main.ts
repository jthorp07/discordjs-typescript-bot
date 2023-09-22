import { Client, GatewayIntentBits } from "discord.js";
import { config } from "dotenv";
import { fork } from "child_process";
import { exit } from "process";
import { setEventHandlers } from "./util";

config();
const TOKEN = process.env.TOKEN;


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

setEventHandlers(client);

client.login(TOKEN);
