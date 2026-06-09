import { channelLink, SlashCommandBuilder } from 'discord.js'

const setupCommandBuilder = new SlashCommandBuilder()
.setName('setup')
.setDescription("Configurer l'application")
.addChannelOption(channel => channel
    .setName('logsChannel')
    .setDescription("Canal de logs Z-BOT")
    .setRequired(false)
)
.addChannelOption(channel => channel
    .setName('levelChannel')
    .setDescription("Canal pour les annonces de niveaux")
    .setRequired(false)
)
.addChannelOption(channel => channel
    .setName('moderatorCategory')
    .setDescription("Catégorie pour le canal de logs")
    .setRequired(false)
)
.addChannelOption(channel => channel
    .setName('generalCategory')
    .setDescription("Catégorie pour le canal des annonces de niveaux")
    .setRequired(false)
)
.addRoleOption(role => role
    .setName('roleRewardTier1')
    .setDescription("Role pour la récompense de niveau de tier 1")
    .setRequired(false)
)
.addRoleOption(role => role
    .setName('roleRewardTier2')
    .setDescription("Role pour la récompense de niveau de tier 2")
    .setRequired(false)
)
.addRoleOption(role => role
    .setName('roleRewardTier3')
    .setDescription("Role pour la récompense de niveau de tier 3")
    .setRequired(false)
)

export { setupCommandBuilder }