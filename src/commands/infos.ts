import { ChatInputCommandInteraction, Client } from 'discord.js'
import { createInfosEmbed } from '../embeds'

export async function executeInfosSlashCommand(interaction: ChatInputCommandInteraction, client: Client<true>) {

    await interaction.deferReply()
    const infosEmbed = await createInfosEmbed(client)
    interaction.editReply({ embeds: [infosEmbed] })

}