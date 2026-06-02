import { EmbedBuilder } from 'discord.js'

export async function createChangelogEmbed(data: any) {

    const changelogEmbed = new EmbedBuilder()
    .setTitle(data.name)
    .setDescription(data.body)
    .setColor('Blue')

    return(changelogEmbed)

}