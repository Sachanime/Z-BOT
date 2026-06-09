import { Client } from 'discord.js'
import { registerFont } from 'canvas'
import path from 'path'
import express from 'express'
import SmeeClient from 'smee-client'
import { displayBanner } from './functions'
import { clientReady, secretEvent, deleteOnMemberLeave, interactionCreate, levelingOnMessageCreate, levelingOnVoiceUpdate, registerOnMessageCreate, registerOnVoiceUpdate, updateOnUserUpdate, expressIssues, expressPR } from './events'

const bannersPath = path.join(__dirname, '..', 'assets', 'banners')
const editorBannerPath = path.join(bannersPath, 'editorBanner.txt')
const appBannerPath = path.join(bannersPath, 'appBanner.txt')
const token = process.env.DISCORD_TOKEN
const client = new Client({ intents:[3276799] })
export const voiceTimer = new Map<string, number>()
const smeeIssues = new SmeeClient({ source: 'https://smee.io/jYkEOAYZzPeGW5', target: 'http://localhost:3000/issues', logger: console })
const expressApp = express()
smeeIssues.start()
expressApp.use(express.json())

displayBanner(editorBannerPath)
displayBanner(appBannerPath)

const fontPath = path.join(__dirname, '..', 'assets', 'fonts')
registerFont(path.join(fontPath, 'gg sans Bold.ttf'), { family: 'Discord', weight: 'bold' })
registerFont(path.join(fontPath, 'gg sans Medium.ttf'), { family: 'Discord', weight: 'normal' })
registerFont(path.join(fontPath, 'gg sans Regular.ttf'), { family: 'Discord', weight: 'lighter' })
registerFont(path.join(fontPath, 'gg sans Semibold.ttf'), { family: 'Discord', weight: 'semibold' })
console.log("Fonts loaded")

client.once(clientReady.name, () => clientReady.execute(client))
client.on(secretEvent.name, (message) => secretEvent.execute(message, client))
client.on(interactionCreate.name, (interaction) => interactionCreate.execute(interaction, client))
client.on(registerOnMessageCreate.name, (message) => registerOnMessageCreate.execute(message, client))
client.on(updateOnUserUpdate.name, (oldUser, newUser) => updateOnUserUpdate.execute(newUser, client))
client.on(deleteOnMemberLeave.name, (member) => deleteOnMemberLeave.execute(member, client))
client.on(levelingOnMessageCreate.name, (message) => levelingOnMessageCreate.execute(message, client))
client.on(registerOnVoiceUpdate.name, (oldState, newState) => registerOnVoiceUpdate.execute(newState, client))
client.on(levelingOnVoiceUpdate.name, (oldState, newState) => levelingOnVoiceUpdate.execute(oldState, newState, client))
expressApp.post(expressIssues.name, (req, res) => expressIssues.execute(req, res, client))
expressApp.post(expressPR.name, (req, res) => expressPR.execute(req, res, client))
console.log("Events loaded")

expressApp.listen(3000, () => console.log("Express listening on port 3000"))
client.login(token)