import { EmbedBuilder, User } from 'discord.js'

export async function createLevelUpEmbed(user: User, lvl: number) {

    const levelUpEmbed = new EmbedBuilder()
    .setTitle("Level Up!")
    .setDescription(`${user} vient de passe niveau ${lvl}`)
    .setColor('Green')
    .setThumbnail('https://cdn-icons-png.freepik.com/256/6180/6180583.png?semt=ais_hybrid')

    return(levelUpEmbed)

}