import { config } from 'dotenv'
import { Routes } from 'discord.js'
import { REST } from '@discordjs/rest'
import { resolve } from "path"
import {
    changelogCommandBuilder,
    infosCommandBuilder,
    levelCommandBuilder,
    setupCommandBuilder,
    adminLevelCommandBuilder,
    voiceCommandBuilder
} from './commands/builders'

config({ path: resolve(__dirname, '../.env') })

const token = process.env.DISCORD_TOKEN as string
const clientId = process.env.DISCORD_CLIENT_ID as string
const commands = [
    changelogCommandBuilder,
    infosCommandBuilder,
    levelCommandBuilder,
    setupCommandBuilder,
    adminLevelCommandBuilder,
    voiceCommandBuilder
].map(command => command.toJSON())
const rest = new REST({ version: '10' }).setToken(token)

rest.put(Routes.applicationCommands(clientId), { body: commands })
.then((data: any) => console.log(`Successfullly registered ${data.length} application commands`))
.catch(console.error)