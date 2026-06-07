import { Client } from 'discord.js'
import path from 'path'
import { displayBanner } from './functions'
import { clientReady, testEvent, deleteOnMemberLeave, interactionCreate, levelingOnMessageCreate, levelingOnVoiceUpdate, registerOnMessageCreate, registerOnVoiceUpdate, updateOnUserUpdate } from './events'

const bannersPath = path.join(__dirname, '..', 'assets', 'banners')
const editorBannerPath = path.join(bannersPath, 'editorBanner.txt')
const appBannerPath = path.join(bannersPath, 'appBanner.txt')
const token = process.env.DISCORD_TOKEN
const client = new Client({ intents:[3276799] })
export const voiceTimer = new Map<string, number>()

displayBanner(editorBannerPath)
displayBanner(appBannerPath)

client.once(clientReady.name, () => clientReady.execute(client))
client.on(messageCreate.name, (message) => messageCreate.execute(message))
client.on(interactionCreate.name, (interaction) => interactionCreate.execute(interaction, client))
client.on(registerOnMessageCreate.name, (message) => registerOnMessageCreate.execute(message))
client.on(updateOnUserUpdate.name, (oldUser, newUser) => updateOnUserUpdate.execute(newUser))
client.on(deleteOnMemberLeave.name, (member) => deleteOnMemberLeave.execute(member))
client.on(levelingOnMessageCreate.name, (message) => levelingOnMessageCreate.execute(message, client))
client.on(registerOnVoiceUpdate.name, (oldState, newState) => registerOnVoiceUpdate.execute(newState))
client.on(levelingOnVoiceUpdate.name, (oldState, newState) => levelingOnVoiceUpdate.execute(oldState, newState, client))

console.log("Events loaded")
client.login(token)