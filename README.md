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
- InteractionCreate: (note there is also an empty generic InteractionCreate handler that is disabled by default)
    - ChatInputCommandInteraction
    - AnySelectMenuInteraction (user will need to further type check for specific SelectMenu types themselves as they see necessary)
    - ButtonInteraction
- VoiceStateUpdate
- ClientReady
- GuildCreate
- ApplicationCommandPermissionsUpdate
- AutoModerationActionExecution
- AutoModerationRuleCreate
- AutoModerationRuleDelete
- AutoModerationRuleUpdate
- ChannelCreate
- ChannelDelete
- ChannelPinsUpdate
- ChannelUpdate
- Debug
- EmojiCreate
- EmojiDelete
- EmojiUpdate
- Error
- GuildAuditLogEntryCreate
- GuildAvailable
- GuildBanAdd
- GuildBanRemove
- GuildCreate
- GuildDelete
- GuildIntegrationsUpdate
- GuildMemberAdd
- GuildMemberAvailable
- GuildMemberRemove
- GuildMembersChunk
- GuildMemberUpdate
- GuildScheduledEventCreate
- GuildScheduledEventDelete
- GuildScheduledEventUpdate
- GuildScheduledEventUserAdd
- GuildScheduledEventUserRemove
- GuildUnavailable
- GuildUpdate
- InviteCreate
- InviteDelete
- MessageCreate
- MessageDelete
- MessageDeleteBulk
- MessageReactionAdd
- MessageReactionRemove
- MessageReactionRemoveAll
- MessageReactionRemoveEmoji
- MessageUpdate
- PresenceUpdate
- RoleCreate
- RoleDelete
- RoleUpdate
- ShardDisconnect
- ShardError
- ShardReady
- ShardReconnecting
- ShardResume
- StageInstanceCreate
- StageInstanceDelete
- StageInstanceUpdate
- StickerCreate
- StickerDelete
- StickerUpdate
- ThreadCreate
- ThreadDelete
- ThreadListSync
- ThreadMembersUpdate
- ThreadMemberUpdate
- ThreadUpdate
- TypingStart
- UserUpdate
- VoiceStateUpdate
- Warn
- WebhooksUpdate

However, it should be noted that only the `ClientReady` and various `InteractionCreate` handlers come with a meaningful implementation. To prevent bloating the bot with many unused handlers, each handler has a `useHandler` boolean field, which when set to true will result in the bot having that handler attached to it during initialization. 

By default, only the handlers found in the following files are enabled: 
- `util/handlers/ready.ts`
- `util/handlers/select_menus.ts`
- `util/handlers/buttons.ts`
- `util/handlers/slash_commands.ts`

<a id="toc-feature-db"></a>  

### Adding a Database
Due to the variety of database management systems available, I did not want to prescribe a specific database methodology for the project. It is possible that in the far future I may add some branches that contain database features, but for now users will have to add the database themselves if they want one.

<a id="toc-user-guide"></a>  

## User Guide

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

<a id="toc-guide-components"></a>

### Using Buttons, SelectMenus, and Modals

Buttons, SelectMenus, and Modals all have the same basic structure in this template, with the only differences being how they are built using Discord.js. To add a new custom component, start by going to the directory for that component and making a new file that default exports that component's type (`IButton`, `ISelectMenu`, `IModal`):

```TypeScript
import { ButtonBuilder, ButtonStyle } from "discord.js";
import { IButton, ICommandPermission } from "../types/discord_interactions";

const customId = 'hello'

const button: IButton = {
  customId: customId,
  execute: async (interaction, idArgs) => {
    await interaction.reply({content:"You pressed a button!"});
  },
  permissions: ICommandPermission.ALL,
  button: () => {
    return new ButtonBuilder()
      .setCustomId(customId)
      .setStyle(ButtonStyle.Primary)
      .setLabel("Hello");
  }
}

export default button;
```

The `button` property (or corresponsing property for other component types) can take in any amount of arguments as needed to build the component, and this property should be used to consistently construct the component wherever it is used in the bot.

Components in this template are allowed to have arguments passed in and parsed out of their custom IDs. To add arguments to the custom ID of a component, set the ID as a string with the component's ID (to identify the function to use), followed by the arguments all separated by colons.

**idArgs example:**
```typescript
// to be put in {component}Builder().setCustomId()
const customId = `${componentId}:${argOne}:${argTwo}` // .. etc.

// to extract args in execute()
const myArgOne = idArgs[1] // args start at index 1 - index 0 is the actual ID
```

<a id="toc-guide-perms"></a>

### Command Permissions
This template povides an optional custom permissions system. This can be enabled by setting the environment variable `USE_CUSTOM_PERMISSIONS=TRUE`. By default, the permissions system comes with two permission levels represented in the `ICommandPermission` enum: `ICommandPermission.ALL` (anyone can use) and `ICommandPermission.SERVER_OWNER` (server owner only). 

To create or customize custom permissions, two changes need to be made. First, a value representing the new permission level needs to be added to the `ICommandPermission` enum located at `src/types/discord_interactions.ts`:  
```TypeScript
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



