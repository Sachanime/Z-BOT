import { Events, Message, MessageType } from 'discord.js'
import { findUserWithId, createUser } from '../functions/database'
import ID from '../ID.json'

export default {

    name: Events.MessageCreate,

    async execute(message: Message) {

        if(message.author.bot) { return }
        if(message.type == MessageType.ChannelPinnedMessage) { return }
            
        const user = await findUserWithId(message.author.id)

        if(user) { return }

        else {
            await createUser(message.author)
            message.react(ID.Emotes.Registered)
        }

    }

} as const