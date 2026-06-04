import { Client } from 'discord.js'

import clientReady from './events/clientReady'
import messageCreate from './events/messageCreate'
import interactionCreate from './events/interactionCreate'
import registerOnMessageCreate from './events/registerOnMessageCreate'

const token = process.env.DISCORD_TOKEN

const client = new Client({ intents:[3276799] })

client.once(clientReady.name, () => clientReady.execute(client))
client.on(messageCreate.name, (message) => messageCreate.execute(message))
client.on(interactionCreate.name, (interaction) => interactionCreate.execute(interaction, client))
client.on(registerOnMessageCreate.name, (message) => registerOnMessageCreate.execute(message))

client.login(token)