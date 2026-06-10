import { ChatInputCommandInteraction, GuildMember } from 'discord.js'
import { updateUserWithId } from '../../functions/database'
import { getXpWithLevel } from '../../functions'
import { createLevelAdminEmbed } from '../../embeds'

export async function executeLevelSetLevelSlashCommand(interaction: ChatInputCommandInteraction) {

    await interaction.deferReply()

    const member = interaction.options.getMember('member') as GuildMember
    const amount = interaction.options.getNumber('amount')
    const newLevel = amount
    const newXp = getXpWithLevel(newLevel)
    const levelAdminEmbed = await createLevelAdminEmbed()

    await updateUserWithId(member.user, newXp, newLevel)
    levelAdminEmbed.setDescription(`Le niveau actuel de ${member.toString()} a été définit à ${amount}`)
    await interaction.editReply({ embeds: [levelAdminEmbed] })

}