import { Client, Events, Interaction } from "discord.js"
import { executeInfosSlashCommand, ping, executeChangelogSlashCommand } from '../commands'

export default {

    name: Events.InteractionCreate,

    execute(interaction: Interaction, client: Client) {

        if(!interaction.isChatInputCommand()) { return }

        if(interaction.commandName == 'test') {
            ping(interaction)
        }

        if(interaction.commandName == 'infos') {
            executeInfosSlashCommand(interaction, client)
        }

        if(interaction.commandName == 'changelog') {
            executeChangelogSlashCommand(interaction)
        }

    }

} as const