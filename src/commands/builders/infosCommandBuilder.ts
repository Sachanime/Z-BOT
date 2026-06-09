import { SlashCommandBuilder } from 'discord.js'

const infosCommandBuilder = new SlashCommandBuilder()
.setName('infos')
.setDescription("Afficher les informations de l'application")

export { infosCommandBuilder }