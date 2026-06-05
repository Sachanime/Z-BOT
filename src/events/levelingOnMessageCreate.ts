import { Events, Message, MessageType } from 'discord.js'
import { findUserWithId, updateUserWithId } from '../functions/database'

export default {

    name: Events.MessageCreate,

    async execute(message: Message) {

        if(message.author.bot) { return }
        if(message.type == MessageType.ChannelPinnedMessage) { return }

        const user = await findUserWithId(message.author.id)

        if(!user) { return }

        const userXp = user.xp + 1
        await updateUserWithId(message.author, userXp)

        
    }

}