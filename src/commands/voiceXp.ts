import { ChatInputCommandInteraction, User, AttachmentBuilder } from 'discord.js'
import { createVoiceXpCanvas } from '../canvas'
import { voiceTimer } from '..'

export async function executeVoiceXpSlashCommand(interaction: ChatInputCommandInteraction) {

    await interaction.deferReply()
    
    let userTarget: User

    if(interaction.options.getUser('user')) {
        userTarget = interaction.options.getUser('user')
    }

    else {
        userTarget = interaction.user
    }

    const timeSpent = voiceTimer.get(userTarget.id)
    const buffer = await createVoiceXpCanvas(userTarget, timeSpent)
    const attachment = new AttachmentBuilder(buffer)

    await interaction.editReply({ files: [attachment] })

}