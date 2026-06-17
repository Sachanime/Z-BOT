import { ChatInputCommandInteraction, GuildMember } from 'discord.js'
import { findUserWithId, updateUserWithId } from '../../functions/database'
import { getLevelWithXp } from '../../functions'
import { createLevelAdminEmbed, createDatabaseErrorEmbed } from '../../embeds'

export async function executeLevelRemoveXpSlashCommand(interaction: ChatInputCommandInteraction) {

    await interaction.deferReply()

    const member = interaction.options.getMember('member') as GuildMember
    const amount = interaction.options.getNumber('amount', true)
    const user = await findUserWithId(member.id)

    if(user == null) {
        const databaseErrorEmbed = createDatabaseErrorEmbed()
        await interaction.editReply({ embeds: [databaseErrorEmbed] })
        return
    }

    const newXp = user.xp - amount
    const newLevel = getLevelWithXp(newXp)
    const levelAdminEmbed = await createLevelAdminEmbed()

    await updateUserWithId(member.user, newXp, newLevel)
    levelAdminEmbed.setDescription(`${member.toString()} a perdu ${amount} points XP`)
    interaction.editReply({ embeds: [levelAdminEmbed] })

}