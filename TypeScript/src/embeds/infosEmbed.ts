import { EmbedBuilder, Client } from 'discord.js'
import packageJson from '../../../package.json'
import packageLock from '../../../package-lock.json'

export async function createInfosEmebed(client: Client) {

    const infoEmbed = new EmbedBuilder()
    .setTitle("Z-BOT")
    .setColor('Blue')
    .setThumbnail(client.user.avatarURL())
    .setDescription(
        packageJson.description + "\n\n" +
        "__**Version**__\n\n" +
        `Z-BOT : ${packageJson.version}\n\n` +
        `Node.js : ${process.version}\n\n` +
        `Discord.js : ${packageLock.packages['node_modules/discord.js'].version}\n` +
        `lowdb : ${packageLock.packages['node_modules/lowdb'].version}`
    )

    return(infoEmbed)

}