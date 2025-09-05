const { SlashCommandBuilder, Routes } = require("discord.js")
const { REST } = require("@discordjs/rest")
const ID = require("./ID-beta.json")
const Token = require("./token.json")

const commands = [

    new SlashCommandBuilder()
    .setName("infos")
    .setDescription("Obtenir des informations sur le BOT"),

    new SlashCommandBuilder()
    .setName("level")
    .setDescription("Obtenir des informations sur votre level")

]

.map(command => command.toJSON())

const rest = new REST({ version: "10" }).setToken(Token.Beta)

rest.put(Routes.applicationCommands(ID.Clients.ZBOT), { body: commands }).then((data) => console.log(`Sucessfully registered ${data.length} application commands`)).catch(console.error)