import { ChatInputCommandInteraction } from 'discord.js'
import { createChangelogEmbed, createChangelogErrorEmbed } from '../embeds'

export async function executeChangelogSlashCommand(interaction: ChatInputCommandInteraction) {

    await interaction.deferReply()

    try {

        const response = await fetch("https://api.github.com/repos/Sachanime/Z-BOT/releases/latest", {

            headers: {
                "Accept": "application/vnd.github+json",
                "User-Agent": "DiscordBot"
            }

        })

        if(!response.ok) {
            throw(new Error(`Erreur API GitHub: ${response.status} ${response.statusText}`))
        }

        const data = await response.json()
        const changelogEmbed = await createChangelogEmbed(data)
        
        interaction.editReply({ embeds: [changelogEmbed] })

    }

    catch(err) {
        const changelogErrorEmbed = await createChangelogErrorEmbed(err)
        interaction.editReply({ embeds: [changelogErrorEmbed] })
    }

}