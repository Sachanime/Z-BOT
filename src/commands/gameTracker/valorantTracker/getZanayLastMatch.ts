import { ChatInputCommandInteraction, AttachmentBuilder } from 'discord.js'
import { generateScoreboard } from '../../../canvas'

export async function getZanayLastMatch(interaction: ChatInputCommandInteraction) {

    await interaction.deferReply()
    const buffer = await generateScoreboard()
    const attachment = new AttachmentBuilder(buffer, { name: "test.png" })
    await interaction.editReply({ files: [attachment] })

}