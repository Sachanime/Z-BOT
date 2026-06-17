import { ChatInputCommandInteraction, Client, TextChannel, CategoryChannel, Role, Snowflake, ChannelType, Guild } from 'discord.js'
import { setEnv } from '../functions'

export async function executeSetupSlashCommand(interaction: ChatInputCommandInteraction, client: Client) {

    await interaction.deferReply()

    const logsChannel = interaction.options.getChannel('logs_channel') as TextChannel
    const levelChannel = interaction.options.getChannel('level_channel') as TextChannel
    const moderatorCategory = interaction.options.getChannel('moderator_category') as CategoryChannel
    const generalCategory = interaction.options.getChannel('general_category') as CategoryChannel
    const roleRewardTier1 = interaction.options.getRole('role_reward_tier1') as Role
    const roleRewardTier2 = interaction.options.getRole('role_reward_tier2') as Role
    const roleRewardTier3 = interaction.options.getRole('role_reward_tier3') as Role
    
    const logsChannelEnvKey = 'DISCORD_CHANNEL_LOGS'
    const levelChannelEnvKey = 'DISCORD_CHANNEL_LEVEL'
    const roleRewardTier1EnvKey = 'DISCORD_ROLEREWARD_TIER1'
    const roleRewardTier2EnvKey = 'DISCORD_ROLEREWARD_TIER2'
    const roleRewardTier3EnvKey = 'DISCORD_ROLEREWARD_TIER3'

    let moderatorCategoryId: Snowflake
    let generalCategoryId: Snowflake
    let zbotCategoryId: Snowflake | null = null

    const interactionGuild = interaction.guild as Guild

    if(moderatorCategory) {
        moderatorCategoryId = moderatorCategory.id
    }

    else {
        const newZbotCategory = await interactionGuild.channels.create({ name: 'Z-BOT', type: ChannelType.GuildCategory, reason: 'Setting-up' })
        moderatorCategoryId = newZbotCategory.id
        zbotCategoryId = newZbotCategory.id
    }

    if(generalCategory) {
        generalCategoryId = generalCategory.id
    }

    else if(zbotCategoryId != null) {
        generalCategoryId = zbotCategoryId
    }

    else {
        const newZbotCategory = await interactionGuild.channels.create({ name: 'Z-BOT', type: ChannelType.GuildCategory, reason: 'Setting up' })
        generalCategoryId = newZbotCategory.id
    }

    if(logsChannel) {
        setEnv(logsChannelEnvKey, logsChannel.id)
    }

    else {
        const newLogsChannel = await interactionGuild.channels.create({ name: 'z-logs', type: ChannelType.GuildText, parent: moderatorCategoryId })
        setEnv(logsChannelEnvKey, newLogsChannel.id)
    }

    if(levelChannel) {
        setEnv(levelChannelEnvKey, levelChannel.id)
    }

    else {
        const newLevelChannel = await interactionGuild.channels.create({ name: 'level', type: ChannelType.GuildText, parent: generalCategoryId })
        setEnv(levelChannelEnvKey, newLevelChannel.id)
    }

    if(roleRewardTier1) {
        setEnv(roleRewardTier1EnvKey, roleRewardTier1.id)
    }

    else {
        const newRoleRewardTier1 = await interactionGuild.roles.create({ name: 'Tier 1', reason: 'Setting up' })
        setEnv(roleRewardTier1EnvKey, newRoleRewardTier1.id)
    }

    if(roleRewardTier2) {
        setEnv(roleRewardTier2EnvKey, roleRewardTier2.id)
    }

    else {
        const newRoleRewardTier2 = await interactionGuild.roles.create({ name: 'Tier 2', reason: 'Setting up' })
        setEnv(roleRewardTier2EnvKey, newRoleRewardTier2.id)
    }

    if(roleRewardTier3) {
        setEnv(roleRewardTier3EnvKey, roleRewardTier3.id)
    }

    else {
        const newRoleRewardTier3 = await interactionGuild.roles.create({ name: 'Tier 3', reason: 'Setting up' })
        setEnv(roleRewardTier3EnvKey, newRoleRewardTier3.id)
    }

    interaction.editReply("Application configured")

}