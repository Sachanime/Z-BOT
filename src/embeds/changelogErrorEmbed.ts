import { EmbedBuilder } from 'discord.js'

export async function createChangelogErrorEmbed(err: any) {

    const changelogErrorEmbed = new EmbedBuilder()
    .setTitle("New release")
    .setDescription("Erreur lors de la récupération du changelog \nVous pouvez y accéder avec la commande `/changelog` \n\n```\n" + err + "\n```")
    .setColor('Red')

    return(changelogErrorEmbed)

}