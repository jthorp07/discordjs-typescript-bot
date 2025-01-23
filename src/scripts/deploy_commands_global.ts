import { REST, RESTPostAPIApplicationCommandsJSONBody, Routes } from "discord.js";
import { exit } from "process";
import { join } from "path";
import { ICommand } from "../adapter_types/discord_interactions";
import { readDirectoryThen } from "../algorithms/io";
import { instance as logger } from "../bot_systems/logger/logger";
import { LogTarget } from "../adapter_types/logging";

const CLIENT = process.env.CLIENT;
const TOKEN = process.env.TOKEN;

if (!TOKEN) {
	logger.log("Missing environment variable TOKEN", LogTarget.Error, "DEPLOY_GLOBAL");
	exit(1);
}

if (!CLIENT) {
	logger.log("Missing environment variable CLIENT", LogTarget.Error, "DEPLOY_GLOBAL");
	exit(1);
}

const commands: RESTPostAPIApplicationCommandsJSONBody[] = [];
readDirectoryThen<ICommand>(join(__dirname, `./commands`), (command) => {
	commands.push(command.data.toJSON());
	logger.log(`Command ${command.data.name} loaded for deployment.`, LogTarget.Info, "DEPLOY_GLOBAL");
});

if (commands.length === 0) {
	logger.log("No commands to deploy.", LogTarget.Warn, "DEPLOY_GLOBAL");
	exit(0);
}

const rest = new REST().setToken(TOKEN);

rest.put(Routes.applicationCommands(CLIENT), { body: commands })
	.then(() => logger.log("Commands deployed to global scope.", LogTarget.Info, "DEPLOY_GLOBAL"))
	.catch(err => logger.log(`Error deploying commands to global scope:\n  ${err}`, LogTarget.Error, "DEPLOY_GLOBAL"));