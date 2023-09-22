import { IButton, ICommandPermission } from "../types/discord_interactions";

const helloButton: IButton = {
  customId: 'hello',
  execute: async (interaction) => {

  },
  permissions: ICommandPermission.ALL
}
