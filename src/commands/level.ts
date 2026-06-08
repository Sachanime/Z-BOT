import { ChatInputCommandInteraction, AttachmentBuilder } from 'discord.js'
import { findUserWithId } from '../functions/database'
import { createLevelCanvas } from '../canvas'

export async function executeLevelSlashCommand(interaction: ChatInputCommandInteraction) {

    await interaction.deferReply()

    if(interaction.options.getUser('user')) {

        const userTarget = interaction.options.getUser('user')
        const userData = await findUserWithId(userTarget.id)
        const xp = userData.xp
        const level = userData.lvl
        const nextLevel = level + 1
        const xpGoal = 5 * nextLevel * (nextLevel + 1)
        const xpMin = 5 * level * (level + 1)
        const relativeXpMin = xp - xpMin
        const relativeXpMax = xpGoal - xpMin

        const buffer = await createLevelCanvas(userTarget, xp, relativeXpMin, relativeXpMax, xpGoal, level)
        const attachment = new AttachmentBuilder(buffer, { name: 'level.png' })

        await interaction.editReply({ files: [attachment] })

    }

    else{

        const userData = await findUserWithId(interaction.user.id)
        let xp = userData.xp
        const level = userData.lvl
        const nextLevel = level + 1
        const xpGoal = 5 * nextLevel * (nextLevel + 1)
        const xpMin = 5 * level * (level + 1)
        const relativeXpMin = xp - xpMin
        const relativeXpMax = xpGoal - xpMin

        const buffer = await createLevelCanvas(interaction.user, xp, relativeXpMin, relativeXpMax, xpGoal, level)
        const attachment = new AttachmentBuilder(buffer, { name: 'level.png' })

        await interaction.editReply({ files: [attachment] })

    }

}