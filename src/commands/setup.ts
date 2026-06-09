import { ChatInputCommandInteraction, Client, TextChannel, CategoryChannel, Role, Snowflake, ChannelType } from 'discord.js'
import { setEnv } from '../functions'

export async function executeSetupSlashCommand(interaction: ChatInputCommandInteraction, client: Client) {

    const logsChannel = interaction.options.getChannel('logsChannel') as TextChannel
    const levelChannel = interaction.options.getChannel('levelChannel') as TextChannel
    const moderatorCategory = interaction.options.getChannel('moderatorCategory') as CategoryChannel
    const generalCategory = interaction.options.getChannel('generalCategory') as CategoryChannel
    const roleRewardTier1 = interaction.options.getRole('roleRewardTier1') as Role
    const roleRewardTier2 = interaction.options.getRole('roleRewardTier2') as Role
    const roleRewardTier3 = interaction.options.getRole('roleRewardTier3') as Role
    
    const logsChannelEnvKey = 'DISCORD_CHANNEL_LOGS'
    const levelChannelEnvKey = 'DISCORD_CHANNEL_LEVEL'
    const roleRewardTier1EnvKey = 'DISCORD_ROLEREWARD_TIER1'
    const roleRewardTier2EnvKey = 'DISCORD_ROLEREWARD_TIER2'
    const roleRewardTier3EnvKey = 'DISCORD_ROLEREWARD_TIER3'

    let moderatorCategoryId: Snowflake
    let generalCategoryId: Snowflake
    let zbotCategoryId: Snowflake

    if(moderatorCategory) {
        moderatorCategoryId = moderatorCategory.id
    }

    else {
        const newZbotCategory = await interaction.guild.channels.create({ name: 'Z-BOT', type: ChannelType.GuildCategory, reason: 'Setting-up' })
        moderatorCategoryId = newZbotCategory.id
        zbotCategoryId = newZbotCategory.id
    }

    if(generalCategory) {
        generalCategoryId = generalCategory.id
    }

    else if(zbotCategoryId) {
        generalCategoryId = zbotCategoryId
    }

    else {
        const newZbotCategory = await interaction.guild.channels.create({ name: 'Z-BOT', type: ChannelType.GuildCategory, reason: 'Setting up' })
        moderatorCategoryId = newZbotCategory.id
    }

    if(logsChannel) {
        setEnv(logsChannelEnvKey, logsChannel.id)
    }

    else {
        const newLogsChannel = await interaction.guild.channels.create({ name: 'z-logs', type: ChannelType.GuildText, parent: moderatorCategoryId })
        setEnv(logsChannelEnvKey, newLogsChannel.id)
    }

    if(levelChannel) {
        setEnv(levelChannelEnvKey, levelChannel.id)
    }

    else {
        const newLevelChannel = await interaction.guild.channels.create({ name: 'level', type: ChannelType.GuildText, parent: generalCategoryId })
        setEnv(levelChannelEnvKey, newLevelChannel.id)
    }

    if(roleRewardTier1) {
        setEnv(roleRewardTier1EnvKey, roleRewardTier1.id)
    }

    else {
        const newRoleRewardTier1 = await interaction.guild.roles.create({ name: 'Tier 1', reason: 'Setting up' })
        setEnv(roleRewardTier1EnvKey, newRoleRewardTier1.id)
    }

    if(roleRewardTier2) {
        setEnv(roleRewardTier2EnvKey, roleRewardTier2.id)
    }

    else {
        const newRoleRewardTier2 = await interaction.guild.roles.create({ name: 'Tier 2', reason: 'Setting up' })
        setEnv(roleRewardTier2EnvKey, newRoleRewardTier2.id)
    }

    if(roleRewardTier3) {
        setEnv(roleRewardTier3EnvKey, roleRewardTier3.id)
    }

    else {
        const newRoleRewardTier3 = await interaction.guild.roles.create({ name: 'Tier 3', reason: 'Setting up' })
        setEnv(roleRewardTier3EnvKey, newRoleRewardTier3.id)
    }

}