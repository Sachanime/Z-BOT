import { ChatInputCommandInteraction, GuildMember } from 'discord.js'
import { findUserWithId, updateUserWithId } from '../functions/database'
import { getXpWithLevel } from '../functions'
import { createLevelAdminEmbed } from '../embeds'

export async function executeLevelRemoveLevelSlashCommand(interaction: ChatInputCommandInteraction) {

    await interaction.deferReply()

    const member = interaction.options.getMember('member') as GuildMember
    const amount = interaction.options.getNumber('amount')
    const user = await findUserWithId(member.id)
    const newLevel = user.lvl - amount
    const newXp = getXpWithLevel(newLevel)
    const levelAdminEmbed = await createLevelAdminEmbed()

    await updateUserWithId(member.user, newXp, newLevel)
    levelAdminEmbed.setDescription(`${member.toString()} a perdu ${amount} niveaux`)
    await interaction.editReply({ embeds: [levelAdminEmbed] })

}