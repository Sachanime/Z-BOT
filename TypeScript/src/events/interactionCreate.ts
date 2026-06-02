import { Client, Events, Interaction } from "discord.js"
import { ping } from '../commands/ping'
import { executeInfosSlashCommand } from '../commands/infos'

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

    }

} as const