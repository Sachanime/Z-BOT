const { SlashCommandBuilder, Routes, PermissionFlagsBits, Client } = require("discord.js")
const { REST } = require("@discordjs/rest")
const ID = require("./ID.json")

const commands = [

    new SlashCommandBuilder()
    .setName("connect")
    .setDescription("Lance une connexion à la base de donnée"),

    new SlashCommandBuilder()
    .setName("infos")
    .setDescription("Obtenir des informations sur le BOT"),

    new SlashCommandBuilder()
    .setName("level")
    .setDescription("Obtenir des informations sur le "),

    new SlashCommandBuilder()
    .setName("test")
    .setDescription("A test command for development"),

    new SlashCommandBuilder()
    .setName("update")
    .setDescription("Send update messages")

]

.map(command => command.toJSON())

const rest = new REST({ version: "10" }).setToken(ID.Tokens.ZBOT)

rest.put(Routes.applicationCommands(ID.Clients.ZBOT), { body: commands }).then((data) => console.log(`Sucessfully registered ${data.length} application commands`)).catch(console.error)