import { ChatInputCommandInteraction, GuildMember } from 'discord.js'
import { findUserWithId, updateUserWithId } from '../functions/database'
import { getLevelWithXp } from '../functions'
import { createLevelAdminEmbed } from '../embeds'

export async function executeLevelRemoveXpSlashCommand(interaction: ChatInputCommandInteraction) {

    await interaction.deferReply()

    const member = interaction.options.getMember('member') as GuildMember
    const amount = interaction.options.getNumber('amount')
    const user = await findUserWithId(member.id)
    const newXp = user.xp - amount
    const newLevel = getLevelWithXp(newXp)
    const levelAdminEmbed = await createLevelAdminEmbed()

    await updateUserWithId(member.user, newXp, newLevel)
    levelAdminEmbed.setDescription(`${member.toString()} a perdu ${amount} points XP`)
    interaction.editReply({ embeds: [levelAdminEmbed] })

}