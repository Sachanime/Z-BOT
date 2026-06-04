import { Client } from 'discord.js'
import path from 'path'
import { displayBanner } from './functions'

const bannersPath = path.join(__dirname, '..', '..', 'assets', 'banners')
const editorBannerPath = path.join(bannersPath, 'editorBanner.txt')
const appBannerPath = path.join(bannersPath, 'appBanner.txt')

displayBanner(editorBannerPath)
displayBanner(appBannerPath)

import clientReady from './events/clientReady'
import messageCreate from './events/messageCreate'
import interactionCreate from './events/interactionCreate'
import registerOnMessageCreate from './events/registerOnMessageCreate'
import updateOnUserUpdate from './events/updateOnUserUpdate'

const token = process.env.DISCORD_TOKEN

const client = new Client({ intents:[3276799] })

client.once(clientReady.name, () => clientReady.execute(client))
client.on(messageCreate.name, (message) => messageCreate.execute(message))
client.on(interactionCreate.name, (interaction) => interactionCreate.execute(interaction, client))
client.on(registerOnMessageCreate.name, (message) => registerOnMessageCreate.execute(message))
client.on(updateOnUserUpdate.name, (oldUser, newUser) => updateOnUserUpdate.execute(newUser))

client.login(token)