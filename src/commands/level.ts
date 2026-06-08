import { ChatInputCommandInteraction, AttachmentBuilder } from 'discord.js'
import { findUserWithId } from '../functions/database'
import { createLevelCanvas } from '../canvas'

export async function executeLevelSlashCommand(interaction: ChatInputCommandInteraction) {

    if(interaction.options.getUser('user')) {

        await interaction.deferReply()

        const userTarget = interaction.options.getUser('user')
        const userData = await findUserWithId(userTarget.id)
        const xp = userData.xp
        const level = userData.lvl
        const nextLevel = level + 1
        const xpGoal = 5 * nextLevel * (nextLevel + 1)

        const buffer = await createLevelCanvas(userTarget, xp, xpGoal, level)
        const attachment = new AttachmentBuilder(buffer, { name: "level.png" })

        await interaction.editReply({ files: [attachment] })

    }

}