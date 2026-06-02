import { ChatInputCommandInteraction } from 'discord.js'

export function ping(interaction: ChatInputCommandInteraction) {

    try {
        interaction.reply("Pong!")
    }

    catch(err) {
        console.error('Reply error :\n', err)
    }

}