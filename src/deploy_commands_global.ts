import { REST, Routes } from "discord.js";
import { config } from "dotenv";
import { readdirSync } from "fs";
import { exit } from "process";

config();
const CLIENT = process.env.CLIENT;
const TOKEN = process.env.TOKEN;

if (!TOKEN) {
	console.log('[Deploy]: Missing environment variable TOKEN');
	exit();
}

if (!CLIENT) {
	console.log('[Deploy]: Missing environment variable CLIENT');
	exit();
}

const commands = [];
const commandFiles = readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST().setToken(TOKEN);

// For Guild Commands (for now, all commands will be Guild scope in the test server)
rest.put(Routes.applicationCommands(CLIENT), { body: commands })
	.then(() => console.log('[Deploy]: Successfully registered application commands.'))
	.catch(console.error);