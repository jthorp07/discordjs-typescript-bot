# Discord.js v14.13.0 Typescript Bot Template

## Contents
- [Features](#toc-features)
    - [Handlers](#toc-feature-handlers)
    - [Adding a Database](#toc-feature-db)
- [User Guide](#toc-user-guide)
    - [Creating Commands](#toc-guide-command-create)
    - [Environment Variables](#toc-guide-env)

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

<a id="toc-guide-command-create"></a>

### Creating a Command
Commands should be contained in a single file in the commands directory (`src/commands`). The bare minimum needed for a command to work in this template is a default export of the `ICommand` type:  
```typescript
    import { SlashCommandBuilder } from "discord.js";
    import { ICommand, ICommandPermission } from "../types/discord_interactions";

    const myCommand: ICommand = {
        data: new SlashCommandBuilder()
            .setName("helloworld") // command name must be all lowercase
            .setDescription("Says hello to the world"),
        execute: async (interaction) {
            // Command code here
            await interaction.reply({content: "Hello World"});
        },
        permissions: ICommandPermission.ALL
    }
```

<a id="toc-guide-env"></a>

### Environment Variables
There is an included .env file in this repository. Users should supply their environment variables to that file or make a new .env file with the same format (and .gitignore it *cough cough*)

#### Needed Environment Variables:
- TOKEN (the bot's token - can be found on the Discord Developer Portal)
- CLIENT (the bot user's Discord ID)
- DEV_SERVER (the server ID of the Discord server that `src/deploy-commands.ts` will register commands to by default)

