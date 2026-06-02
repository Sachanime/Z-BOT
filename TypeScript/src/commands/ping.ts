import { ChatInputCommandInteraction } from 'discord.js'

export function ping(interaction: ChatInputCommandInteraction) {
        interaction.reply("Pong!")
}