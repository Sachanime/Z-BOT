import { ChatInputCommandInteraction, GuildMember } from 'discord.js'
import { findUserWithId, updateUserWithId } from '../functions/database'
import { getLevelWithXp } from '../functions'
import { createLevelAdminEmbed } from '../embeds'

export async function executeLevelSetXpSlashCommand(interaction: ChatInputCommandInteraction) {

    await interaction.deferReply()

    const member = interaction.options.getMember('member') as GuildMember
    const amount = interaction.options.getNumber('amount')
    const newXp = amount
    const newLevel = getLevelWithXp(newXp)
    const levelAdminEmbed = await createLevelAdminEmbed()

    await updateUserWithId(member.user, newXp, newLevel)
    levelAdminEmbed.setDescription(`Le nombre actuel de points XP de ${member.toString()} a été définit à ${amount}`)
    await interaction.editReply({ embeds: [levelAdminEmbed] })

}