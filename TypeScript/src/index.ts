import { ActivityType, Client } from "discord.js"

import Token from './token.json' with { type: 'json' }

const client = new Client({ intents:[3276799] })

client.login(Token.Beta)

client.once('clientReady', async () => {

    await client.application.fetch()
    console.log(`Connected to ${client.application.name}`)
    client.user.setPresence({ activities: [{ name: "Self development", type: ActivityType.Watching }] })

})

client.on('messageCreate', (message) => {

    if(message.content == "!ping") {
        message.reply(`Pong!`)
    }

})