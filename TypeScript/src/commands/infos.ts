import { ChatInputCommandInteraction, Client } from 'discord.js'
import { createInfosEmebed } from '../embeds/infosEmbed'

export async function executeInfosSlashCommand(interaction: ChatInputCommandInteraction, client: Client) {

    await interaction.deferReply()
    const infosEmbed = await createInfosEmebed(client)
    interaction.editReply({ embeds: [infosEmbed] })

}