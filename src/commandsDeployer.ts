import { config } from 'dotenv'
import { Routes } from 'discord.js'
import { REST } from '@discordjs/rest'
import { resolve } from "path"
import { changelogCommandBuilder, infosCommandBuilder, levelCommandBuilder, setupCommandBuilder } from './commands/builders'

config({ path: resolve(__dirname, '../.env') })

const token = process.env.DISCORD_TOKEN
const clientId = process.env.DISCORD_CLIENT_ID
const commands = [changelogCommandBuilder, infosCommandBuilder, levelCommandBuilder, setupCommandBuilder].map(command => command.toJSON())
const rest = new REST({ version: '10' }).setToken(token)

rest.put(Routes.applicationCommands(clientId), { body: commands })
.then((data: any) => console.log(`Successfullly registered ${data.length} application commands`))
.catch(console.error)