import { SlashCommandBuilder } from 'discord.js'

const setupCommandBuilder = new SlashCommandBuilder()
.setName('setup')
.setDescription("Configurer l'application")
.addChannelOption(channel => channel
    .setName('logs_channel')
    .setDescription("Canal de logs Z-BOT")
    .setRequired(false)
)
.addChannelOption(channel => channel
    .setName('level_channel')
    .setDescription("Canal pour les annonces de niveaux")
    .setRequired(false)
)
.addChannelOption(channel => channel
    .setName('moderator_category')
    .setDescription("Catégorie pour le canal de logs")
    .setRequired(false)
)
.addChannelOption(channel => channel
    .setName('general_category')
    .setDescription("Catégorie pour le canal des annonces de niveaux")
    .setRequired(false)
)
.addRoleOption(role => role
    .setName('role_reward_tier1')
    .setDescription("Role pour la récompense de niveau de tier 1")
    .setRequired(false)
)
.addRoleOption(role => role
    .setName('role_reward_tier2')
    .setDescription("Role pour la récompense de niveau de tier 2")
    .setRequired(false)
)
.addRoleOption(role => role
    .setName('role_reward_tier3')
    .setDescription("Role pour la récompense de niveau de tier 3")
    .setRequired(false)
)

export { setupCommandBuilder }