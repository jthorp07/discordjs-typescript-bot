import { REST, RESTPostAPIApplicationCommandsJSONBody, Routes } from "discord.js";
import { readdirSync } from "fs";
import { exit } from "process";
import { join } from "path";
import { ICommand } from "../adapter_types/discord_interactions";

const CLIENT = process.env.CLIENT;
const TOKEN = process.env.TOKEN;

if (!TOKEN) {
	console.log('[Deploy]: Missing environment variable TOKEN');
	exit(1);
}

if (!CLIENT) {
	console.log('[Deploy]: Missing environment variable CLIENT');
	exit(1);
}

const commands: RESTPostAPIApplicationCommandsJSONBody[] = [];
const commandFiles = readdirSync(join(__dirname, `./commands`)).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	try {
		console.log(`[Deploy]: Attempting to read command from file ${file}`);
		let path = join(__dirname, `./commands/${file}`);
		const command = require(path) as { default: ICommand };
		commands.push(command.default.data.toJSON());
		console.log(`[Deploy]: Read command from file ${file}`);
	} catch (err) {
		console.log(`[Deploy]: Failed to read command from file ${file}`);
	}
}

if (commands.length === 0) {
	console.log('[Deploy]: No commands to deploy.');
	exit(0);
}

const rest = new REST().setToken(TOKEN);

rest.put(Routes.applicationCommands(CLIENT), { body: commands })
	.then(() => console.log('[Deploy]: Successfully registered application commands globally.'))
	.catch(console.error);