import { SlashCommandBuilder } from 'discord.js'

const voiceXpCommandBuilder = new SlashCommandBuilder()
.setName('voice_xp')
.setDescription("Afficher votre temps passé en vocal ou celui d'un membre")
.addUserOption(option => option
    .setName('user')
    .setDescription('Membre')
    .setRequired(false)
)

export { voiceXpCommandBuilder }