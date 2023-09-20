import { REST } from "discord.js";
import { Routes } from "discord.js";
import { config } from "dotenv";
import { readdirSync } from "fs";
import { exit } from "process";

config();
const CLIENT_ID = process.env.CLIENT_ID;
const TOKEN = process.env.TOKEN;
const GUILD_ID = process.env.DEV_SERVER;

if (!TOKEN) {
	console.log('token');
	exit();
}

if (!CLIENT_ID) {
	console.log('client');
	exit();
}

if (!GUILD_ID) {
	console.log('guild');
	exit();
}

const commands = [];
const commandFiles = readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(TOKEN);

// For Guild Commands (for now, all commands will be Guild scope in the test server)
rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);



// This will be for Global scope commands (if applicable)

// rest.put(Routes.applicationGuildCommands(clientId), { body: commands })
// 	.then(() => console.log('Successfully registered application commands.'))
// 	.catch(console.error);