import { Client } from 'discord.js'

import Token from './token.json'

import clientReady from './events/clientReady'
import messageCreate from './events/messageCreate'
import interactionCreate from './events/interactionCreate'

const client = new Client({ intents:[3276799] })

client.once(clientReady.name, () => clientReady.execute(client))
client.on(messageCreate.name, (message) => messageCreate.execute(message))
client.on(interactionCreate.name, (interaction) => interactionCreate.execute(interaction, client))

client.login(Token.Beta)