import { EmbedBuilder } from 'discord.js'

export async function createLevelAdminEmbed() {

    const levelAdminEmbed = new EmbedBuilder()
    .setTitle("Level Confirmation")
    .setColor('Green')

    return(levelAdminEmbed)

}