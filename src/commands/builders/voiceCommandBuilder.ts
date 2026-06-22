import { SlashCommandBuilder } from 'discord.js'

const voiceCommandBuilder = new SlashCommandBuilder()
.setName('voice')
.setDescription("Afficher votre temps passé en vocal ou celui d'un membre")
.addUserOption(option => option
    .setName('user')
    .setDescription('Membre')
    .setRequired(false)
)

export { voiceCommandBuilder }