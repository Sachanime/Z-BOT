import { Events, User, Client, TextChannel, TextChannelResolvable } from 'discord.js'
import { findUserWithId, updateUserWithId } from '../functions/database'
import { createSystemErrorEmbed, createDatabaseErrorEmbed } from '../embeds'
import { Systems } from '../enum'

export default {

    name: Events.UserUpdate,

    async execute(user: User, client: Client) {
        
        try {

            if(user.bot) { return }

            const findedUser = await findUserWithId(user.id)

            if(!findedUser) { return } 

            await updateUserWithId(user, findedUser.xp, findedUser.lvl)

        }

        catch(err) {
            const errorChannel = client.channels.cache.get(process.env.DISCORD_CHANNEL_LOGS as string) as TextChannel
            const systemErrorEmbed = await createSystemErrorEmbed(Systems.memberUpdate, err)
            errorChannel.send({ embeds: [systemErrorEmbed] })
            console.log("System error reported")
        }

    }

} as const