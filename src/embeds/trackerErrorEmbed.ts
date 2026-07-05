import { EmbedBuilder } from 'discord.js'

function createTrackerErrorEmbed() {

    const trackerErrorEmbed = new EmbedBuilder()
    .setTitle("Tracker Error")
    .setDescription("The resquested user doesn't have registered Valorant PUUID")
    .setColor("Red")

    return(trackerErrorEmbed)

}

export { createTrackerErrorEmbed }