import { Events, GuildMember, PartialGuildMember, Client, TextChannel } from 'discord.js'
import { deleteUserWithId } from '../functions/database'
import { createSystemErrorEmbed } from '../embeds'
import { Systems } from '../enum'

export default {

    name: Events.GuildMemberRemove,

    async execute(member: GuildMember | PartialGuildMember, client: Client) {

        try {
            if(member.user.bot) { return }
            await deleteUserWithId(member.user.id)
        }

        catch(err) {
            const errorChannel = client.channels.cache.get(process.env.DISCORD_ERROR_CHANNEL) as TextChannel
            const systemErrorEmbed = await createSystemErrorEmbed(Systems.memberLeave, err)
            errorChannel.send({ embeds: [systemErrorEmbed] })
            console.log("System error reported")
        }

    }

} as const