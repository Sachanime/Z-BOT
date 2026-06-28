import { ChatInputCommandInteraction, AttachmentBuilder } from 'discord.js'
import { createValorantMatchSummaryCanvas } from '../../../canvas'

export async function getZanayLastMatch(interaction: ChatInputCommandInteraction) {

    await interaction.deferReply()
    const buffer = await createValorantMatchSummaryCanvas()
    const attachment = new AttachmentBuilder(buffer, { name: "test.png" })
    await interaction.editReply({ files: [attachment] })

}