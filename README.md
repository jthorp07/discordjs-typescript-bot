# Discord.js v14.13.0 Typescript Bot Template

## Contents
- [Features](#toc-features)
    - [Handlers](#toc-feature-handlers)
    - [Adding a Database](#toc-feature-db)
- [User Guide](#toc-user-guide)
    - [Environment Variables](#toc-guide-env)
    - [Creating Commands](#toc-guide-command-create)
    - [Custom Permissions](#toc-guide-perms)
    

<a id="toc-features"></a>  

## Feature Rundown
This template is intended to provide a significant amount of boilerplate code in order to allow users to hop right in to making features for their bot. A lot of inspiration has come from the official [Discord.js guide](https://discordjs.guide/#before-you-begin). This documentation will not, however, contain extensive information on how to use the Discord.js library.

<a id="toc-feature-handlers"></a>  

### Built-in Handlers:
This bot template comes with event handlers for the following Discord.js events with some duplicates to handle different callback types:
- InteractionCreate
    - ChatInputCommandInteraction
    - AnySelectMenuInteraction (user will need to further type check for specific SelectMenu types themselves as they see necessary)
    - ButtonInteraction
- VoiceStateUpdate
- ClientReady

<a id="toc-feature-db"></a>  

### Adding a Database
Due to the variety of database management systems available, I did not want to prescribe a specific database methodology for the project. It is possible that in the far future I may add some branches that contain database features, but for now users will have to add the database themselves if they want one.

<a id="toc-user-guide"></a>  

## Usage Guide

<a id="toc-guide-env"></a>

### Environment Variables
There is an included .env file in this repository. Users should supply their environment variables to that file or make a new .env file with the same format (and .gitignore it *cough cough*)

#### Needed Environment Variables:
- TOKEN (the bot's token - can be found on the Discord Developer Portal)
- CLIENT (the bot user's Discord ID)
- DEV_SERVER (the server ID of the Discord server that `src/deploy-commands.ts` will register commands to by default)

<a id="toc-guide-command-create"></a>

### Creating a Command
Commands should be contained in a single file in the commands directory (`src/commands`). The bare minimum needed for a command to work in this template is a default export of the `ICommand` type:  
```typescript
    import { SlashCommandBuilder } from "discord.js";
    import { ICommand, ICommandPermission } from "../types/discord_interactions";

    const command: ICommand = {
        data: new SlashCommandBuilder()
            .setName('hello')
            .setDescription('Says hello')
            .addStringOption(option => 
                option.setName('stringoption')
                .setDescription('A string option')
                .setRequired(true)
            ) as SlashCommandBuilder, // Adding an option changes the builder type to an option builder. It is safe to caste it back to SlashCommandBuilder.
        execute: async (interaction) => {
            let stringoption = interaction.options.getString('stringoption');
            await interaction.reply({content: `\`\`\`Hello ${stringoption}\`\`\``});
        },
        permissions: ICommandPermission.ALL
    }

    export default command;
```  

<a id="toc-guide-perms"></a>

### Command Permissions
This template povides an optional custom permissions system. This can be enabled by setting the environment variable `USE_CUSTOM_PERMISSIONS=TRUE`. By default, the permissions system comes with two permission levels represented in the `ICommandPermission` enum: `ICommandPermission.ALL` and `ICommandPermission.SERVER_OWNER`. 

To create or customize custom permissions, two changes need to be made. First, a value representing the new permission level needs to be added to the `ICommandPermission` enum located at `src/types/discord_interactions.ts`:  
```typescript
export enum ICommandPermission {
    ALL,
    SERVER_OWNER,
    MY_NEW_PERMISSION_LEVEL // add your value here
}
```

Next, a new file should be created in `src/util/permissions/permission_levels` whose default export is of the type `IPermission` and uses the new permission value created in the `ICommandPermission` enum:
```typescript
import { ICommandPermission } from "../../../types/discord_interactions";
import { IPermission } from "../permissions";

const myNewPermission: IPermission = {
    permLevel: ICommandPermission.MY_NEW_PERMISSION_LEVEL,
    permCheck: async (interaction) => {
        // Authenticate the interaction according to the new permission level
        return !interaction.inGuild();
    }
}

export default permServerOwner;
```

From here, the template should read in the new permission file on startup.



