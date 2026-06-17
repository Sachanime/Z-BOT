import { SlashCommandBuilder } from 'discord.js'

const trackerCommandBuilder = new SlashCommandBuilder()
.setName('tracker')
.setDescription("Game tracker")
.addUserOption(option => option
    .setName('user')
    .setDescription("User")
    .setRequired(true)
)

export { trackerCommandBuilder }