import { SlashCommandBuilder } from 'discord.js'

const levelCommandBuilder = new SlashCommandBuilder()
.setName('level')
.setDescription("Affichier votre niveau ou celui d'un membre")
.addUserOption(option => option
    .setName('user')
    .setDescription('Membre')
    .setRequired(false)
)

export { levelCommandBuilder }