import { ChatInputCommandInteraction } from 'discord.js'
import { getPlayerLastMatch } from './gameTracker/valorantTracker'

export async function trackSlashCommand(interaction: ChatInputCommandInteraction) {
    
    const subCommandGroup = interaction.options.getSubcommandGroup()

    if(subCommandGroup == 'valorant') {

        const subCommand = interaction.options.getSubcommand()

        if(subCommand == 'last_match') {
            await getPlayerLastMatch(interaction)
        }

    }

}