import { Events, Message, MessageType, Client, TextChannel } from 'discord.js'
import { findUserWithId, createUser } from '../functions/database'
import { createSystemErrorEmbed } from '../embeds'
import { Systems } from '../enum'
import ID from '../ID.json'

export default {

    name: Events.MessageCreate,

    async execute(message: Message, client: Client) {

        try {

            if(message.author.bot) { return }
            if(message.type == MessageType.ChannelPinnedMessage) { return }
            
            const user = await findUserWithId(message.author.id)

            if(user) { return }

            else {
                await createUser(message.author)
                message.react(ID.Emotes.Registered)
            }

        }

        catch(err) {
            const errorChannel = client.channels.cache.get(process.env.DISCORD_CHANNEL_LOGS as string) as TextChannel
            const systemErrorEmbed = await createSystemErrorEmbed(Systems.messageRegistration, err)
            errorChannel.send({ embeds: [systemErrorEmbed] })
            console.log("System error reported")
        }

    }

} as const