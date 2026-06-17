import { EmbedBuilder } from 'discord.js'

function createDatabaseErrorEmbed() {

    const databaseErrorEmbed = new EmbedBuilder()
    .setTitle("Database Error")
    .setDescription("The resquested user was not found in the database")
    .setColor("Red")

    return(databaseErrorEmbed)

}

export { createDatabaseErrorEmbed }