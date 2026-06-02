import { Events, Message } from 'discord.js'

export default {

    name: Events.MessageCreate,
    
    execute(message: Message) {

        if(message.content == "!ping") {
            message.reply(`Pong!`)
        }

    }

} as const