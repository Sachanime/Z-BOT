import { SlashCommandBuilder } from 'discord.js'

const changelogCommandBuilder = new SlashCommandBuilder()
.setName('changelog')
.setDescription('Afficher le changelog de la dernière release')

export { changelogCommandBuilder }