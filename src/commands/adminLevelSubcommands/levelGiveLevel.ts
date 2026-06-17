import { ChatInputCommandInteraction, GuildMember } from 'discord.js'
import { findUserWithId, updateUserWithId } from '../../functions/database'
import { getXpWithLevel } from '../../functions'
import { createLevelAdminEmbed, createDatabaseErrorEmbed } from '../../embeds'

export async function executeLevelGiveLevelSlashCommand(interaction: ChatInputCommandInteraction) {

    await interaction.deferReply()

    const member = interaction.options.getMember('member') as GuildMember
    const amount = interaction.options.getNumber('amount', true)
    const user = await findUserWithId(member.id)

    if(user == null) {
        const databaseErrorEmbed = createDatabaseErrorEmbed()
        await interaction.reply({ embeds: [databaseErrorEmbed] })
        return
    }

    const newLevel = user.lvl + amount
    const newXp = getXpWithLevel(newLevel)
    const levelAdminEmbed = await createLevelAdminEmbed()

    await updateUserWithId(member.user, newXp, newLevel)
    levelAdminEmbed.setDescription(`${member.toString()} a reçu ${amount} niveaux`)
    await interaction.editReply({ embeds: [levelAdminEmbed] })

}