import { Client } from 'discord.js'

import Token from './token.json'

const client = new Client({ intents:[3276799] })

import clientReady from './events/clientReady'
import messageCreate from './events/messageCreate'

client.once(clientReady.name, () => clientReady.execute(client))
client.on(messageCreate.name, (message) => messageCreate.execute(message))

client.login(Token.Beta)