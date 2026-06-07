import { EmbedBuilder } from 'discord.js'
import { Systems } from '../enum'

export async function createSystemErrorEmbed(systemName: Systems, error: any) {

    const errorEmbed = new EmbedBuilder()
    .setTitle(`${systemName} System Error`)
    .setDescription(`\`\`\`\n${error}\n\`\`\``)
    .setColor("Red")

    return(errorEmbed)

}