const { SlashCommandBuilder, Routes } = require("discord.js")
const { REST } = require("@discordjs/rest")
const ID = require("./ID.json")
const Token = require("./token.json")

const commands = [

    new SlashCommandBuilder()
    .setName("infos")
    .setDescription("Obtenir des informations sur le BOT"),

    new SlashCommandBuilder()
    .setName("level")
    .setDescription("Obtenir des informations sur votre level"),

    //.addSubcommand(subcommand => subcommand
    //    .setName("give_xp")
    //    .setDescription("Donner de l'XP à un membre")
    //    .addUserOption(option => option
    //        .setName("user")
    //        .setDescription("Membre à qui donner l'XP")
    //        .setRequired(true)
    //    )
    //    .addNumberOption(option => option
    //        .setName("value")
    //        .setDescription("Nombre d'XP à donner")
    //        .setRequired(true)
    //    )
    //)
//
    //.addSubcommand(subcommand => subcommand
    //    .setName("remove_xp")
    //    .setDescription("Retirer de l'XP à un membre")
    //    .addUserOption(option => option
    //        .setName("user")
    //        .setDescription("Membre à qui retirer de l'XP")
    //        .setRequired(true)
    //    )
    //    .addNumberOption(option => option
    //        .setName("value")
    //        .setDescription("Nombre d'XP à retirer")
    //        .setRequired(true)
    //    )
    //)
//
    //.addSubcommand(subcommand => subcommand
    //    .setName("leaderboard")
    //    .setDescription("Afficher le leaderboard")
    //),

    new SlashCommandBuilder()
    .setName("changelog")
    .setDescription("Affichier le changelog")

]

.map(command => command.toJSON())

const rest = new REST({ version: "10" }).setToken(Token.ZBOT)

rest.put(Routes.applicationCommands(ID.Clients.ZBOT), { body: commands }).then((data) => console.log(`Sucessfully registered ${data.length} application commands`)).catch(console.error)