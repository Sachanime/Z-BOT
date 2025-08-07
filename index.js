const { Client, EmbedBuilder, MessageType, Message, ActivityType } = require("discord.js")
const mongoose = require("mongoose")
//const { createCanvas, loadImage } = require("canvas")

const client = new Client({ intents: [3276799], /*presence: { status: "dnd", activities:  }*/ })

const levelingSchema = new mongoose.Schema({

    username: { type: String },
    userID: { type: String },
    XP: { type: Number },
    XPGoal: { type: Number },
    level: { type: Number },
    levelGoal: { type: Number }

})

const levelingModel = mongoose.model("LevelingModel", levelingSchema, "Leveling")

//const canvas = createCanvas(200, 200)
//const ctx = canvas.getContext("2d")

const ID = require("./ID.json")
const Token = require("./token.json")
const package = require("./package.json")
const packagelock = require("./package-lock.json")

var botConnexion = "🔴 - Disconnected"
var databaseConnection = "🔴 - Disconnected"

client.login(Token.ZBOT)

//Start System
client.once("ready", () => {

    console.log(" ____  _  ___       ____                                          ")
    console.log("/ ___|| |/ / |     |  _ \\ _ __ ___   __ _ _ __ __ _ _ __ ___  ___ ")
    console.log("\\___ \\| ' /| |     | |_) | '__/ _ \\ / _` | '__/ _` | '_ ` _ \\/ __|")
    console.log(" ___) | . \\| |___  |  __/| | | (_) | (_| | | | (_| | | | | | \\__ \\")
    console.log("|____/|_|\\_\\_____| |_|   |_|  \\___/ \\__, |_|  \\__,_|_| |_| |_|___/")
    console.log("                                    |___/                         ")

    console.log("   ")

    console.log(" _____     ____   ___ _____ ")
    console.log("|__  /    | __ ) / _ \\_   _|")
    console.log("  / /_____|  _ \\| | | || |  ")
    console.log(" / /|_____| |_) | |_| || |  ")
    console.log("/____|    |____/ \\___/ |_|  ")
    console.log("   ")
    
    console.log("Z-BOT : 🟢 - Connected")
    botConnexion = "🟢 - Connected"

    mongoose.set("strictQuery", true)
    mongoose.connect("mongodb://127.0.0.1:27017/Z-DB")
    .then(() => {console.log("DB-Z : 🟢 - Connected")})
    .catch(() => {console.log("DB-Z : 🔴 - Disconnected")})

    //client.user.setStatus("dnd")
    //client.user.setPresence({ activities: [{ name: "En cours de maintenance", type: ActivityType.Custom }] })

    client.user.setPresence({ activities: [{ name: "Z-SPY Discord Server", type: ActivityType.Watching }] })

})

//Register System
client.on("messageCreate", async (message) => {

    //Ignore System
    if(message.author.bot) { return }
    if(message.type == MessageType.ChannelPinnedMessage) { return }

    //Register System
    const registerErrorEmbed = new EmbedBuilder()
    .setTitle("Register System")
    .setDescription("Impossible de vous enregistrer dans la base de donnée. \nMerci de patienter, <@" + ID.Clients.Sacha + "> va intervenir.")
    .setColor("Red")

    if(await levelingModel.findOne({ userID: message.author.id })) { return }

    else{
        const newUser = new levelingModel({ username: message.author.username, userID: message.author.id, XP: 0, XPGoal: 10, level: 0, levelGoal: 10 })
        await newUser.save()
        .then(() => { message.react(ID.Emotes.Registered) })
        .catch(() => { message.reply({ embeds: [registerErrorEmbed] }) })
    }

})

//Leveling System
client.on("messageCreate", async (message) => {

    //Ignore System
    if(message.author.bot) { return }
    if(message.type == MessageType.ChannelPinnedMessage) { return }
    if(message.guild == ID.Guilds.Test) { return }

    //Embeds
    const levelUpEmbed = new EmbedBuilder()
    .setTitle("Level UP !")
    .setDescription("Félicitation, vous venez de monter au niveau supérieur !")
    .setColor("Green")
    .setThumbnail("https://cdn-icons-png.freepik.com/256/6180/6180583.png?semt=ais_hybrid")

    const levelGoalEmbed = new EmbedBuilder()
    .setTitle("Level Goal !")
    .setDescription("Félicitation, vous venez d'atteindre votre level goal !")
    .setColor("Gold")
    .setThumbnail("https://images.vexels.com/media/users/3/147999/isolated/lists/417c14a674920407a978bcaea0ce7cec-goal-square-icon.png")
    
    //Alogrithme
    if(await levelingModel.findOne({ userID: message.author.id })) {

        levelingModel.findOne({ userID: message.author.id })
        .then((result) => {

            levelingModel.updateOne({ userID: message.author.id }, { XP: result.XP + 1 }).then()

            if(result.XP == result.XPGoal - 1) {

                levelUpEmbed.setDescription("<@" + result.userID + "> vient de passer niveau " + (result.level + 1))
                levelingModel.updateMany({ userID: message.author.id }, { $set: { XP: 0, XPGoal: result.XPGoal + 10 , level: result.level + 1 } }).then()
                client.channels.cache.get(ID.Channels.Levels).send({ embeds: [ levelUpEmbed ] })

                levelingModel.findOne({ userID: message.author.id })
                .then((result) => {

                    if(result.level == result.levelGoal) {

                        levelingModel.updateOne({ userID: message.author.id }, { levelGoal: result.levelGoal + 5}).then()
                        
                        if(result.levelGoal == 10) {
                            levelGoalEmbed.setDescription("<@" + result.userID + "> a atteint un objectif et obtient le rôle <@&" + ID.Roles.SPY + ">")
                            client.guilds.cache.get(ID.Servers.ZSPY).members.cache.get(result.userID).roles.add(ID.Roles.SPY)
                        }

                        if(result.levelGoal == 15) {
                            levelGoalEmbed.setDescription("<@" + result.userID + "> a atteint un objectif et obtient le rôle <@&" + ID.Roles.Friend + ">")
                            client.guilds.cache.get(ID.Servers.ZSPY).members.cache.get(result.userID).roles.add(ID.Roles.Friend)
                        }

                        if(result.levelGoal == 20) {
                            levelGoalEmbed.setDescription("<@" + result.userID + "> a atteint un objectif et obtient le rôle <@&" + ID.Roles.BestFriend + ">")
                            client.guilds.cache.get(ID.Servers.ZSPY).members.cache.get(result.userID).roles.add(ID.Roles.BestFriend)
                            levelingModel.updateOne({ userID: message.author.id }, { levelGoal: 0}).then()
                        }

                        client.channels.cache.get(ID.Channels.Levels).send({ embeds: [ levelGoalEmbed ] })

                    }

                })

            }

        })

    }

})

//Command System
client.on("interactionCreate", async interaction => {

    const { commandName } = interaction

    if(commandName == "connect") {

        const connectEmbed = new EmbedBuilder()
        .setTitle("TanukiDB")
        .setThumbnail("https://cdn.iconscout.com/icon/free/png-256/mongodb-5-1175140.png")

        mongoose.set("strictQuery", true)
        mongoose.connect("mongodb://127.0.0.1:27017/Z-DB")
        .then(() => {console.log("DB-Z : 🟢 - Connected")})
        .catch((err) => {console.error(err), console.log("DB-Z : 🔴 - Disconnected")})

        if(mongoose.connection.readyState == 0) {
            databaseConnection = "🔴 - Disconnected"
            connectEmbed.setColor("Red")
        }

        else if(mongoose.connection.readyState == 1) {
            databaseConnection = "🟢 - Connected"
            connectEmbed.setColor("Green")
        }

        else if(mongoose.connection.readyState == 2) {
            databaseConnection = "🟠 - Connection..."
            connectEmbed.setColor("Orange")
        }

        else if(mongoose.connection.readyState == 3) {
            databaseConnection = "🟠 - Disonnection..."
            connectEmbed.setColor("Orange")
        }

        connectEmbed.setDescription(databaseConnection)
        interaction.reply({ embeds: [connectEmbed] })

    }

    if(commandName == "infos") {

        const MongoDBAdmin = mongoose.connection.db.admin()
        const MongoDBBuildInfo = await MongoDBAdmin.command({ buildInfo: 1 })

        const infosEmbed = new EmbedBuilder()
        .setTitle("Z-BOT")
        .setColor("Blue")
        .setThumbnail(client.user.avatarURL())
        .setDescription(
            package.description + "\n\n" +
            "__**Versions**__" + "\n\n" +
            "Z-BOT : " + package.version + "\n\n" +
            "Node.js : " + process.version + "\n" +
            "MongoDB : " + MongoDBBuildInfo.version + "\n\n" +
            "Discord.js : " + packagelock.packages["node_modules/discord.js"].version + "\n" +
            "Mongoose : " + packagelock.packages["node_modules/mongoose"].version + "\n\n" +
            "__**Connexions Status**__" + "\n\n" +
            "Z-BOT : " + botConnexion + "\n" +
            "DB-Z : " + databaseConnection
        )

        if(mongoose.connection.readyState == 0) {
            databaseConnection = "🔴 - Disconnected"
        }

        else if(mongoose.connection.readyState == 1) {
            databaseConnection = "🟢 - Connected"
        }

        else if(mongoose.connection.readyState == 2) {
            databaseConnection = "🟠 - Connection..."
        }

        else if(mongoose.connection.readyState == 3) {
            databaseConnection = "🟠 - Disonnection..."
        }

        interaction.reply({ embeds: [infosEmbed] })

    }

    if(commandName == "level") {

        levelingModel.findOne({ userID: interaction.user.id })
        .then((result) => {

            const levelEmbed = new EmbedBuilder()
            .setTitle("Level")
            .setDescription(
                "Level : " + result.level.toString() + "\n\n" +
                "XP : " + result.XP.toString() + "\n\n" +
                "Prochain niveau à " + result.XPGoal.toString() + "xp \n\n" +
                "Prochaine récompense au niveau " + result.levelGoal.toString()
            )

            interaction.reply({ embeds: [levelEmbed] })

        })

    }

//    if(commandName == "test") {
//
//        //Write "Awesome!"
//        ctx.font = "30px Impact"
//        ctx.rotate(0.1)
//        ctx.fillText("Awesome!", 50, 100)
//
//        //Draw line under text
//        var text = ctx.measureText("Awesome!")
//        ctx.strokeStyle = "rgba(0,0,0,0.5)"
//        ctx.beginPath()
//        ctx.lineTo(50, 102)
//        ctx.lineTo(50 + text.width, 102)
//        ctx.stroke()
//
//        //Draw Image
//        loadImage("https://www.shutterstock.com/image-vector/awesome-colorful-vector-typography-banner-260nw-2311221975.jpg").then((image) => {
//
//            ctx.drawImage(image, 50, 0, 70, 70)
//            console.log('<img src="' + canvas.toDataURL() + '" />')
//
//        })
//
//    }

    if(commandName == "test") {

        if(interaction.user.id == ID.Clients.Sacha) {

            const levelGoalEmbed = new EmbedBuilder()
            .setTitle("Level Goal !")
            .setDescription("Félicitation, vous venez d'atteindre votre level goal !")
            .setColor("Gold")
            .setThumbnail("https://images.vexels.com/media/users/3/147999/isolated/lists/417c14a674920407a978bcaea0ce7cec-goal-square-icon.png")

            levelGoalEmbed.setDescription("<@" + ID.Clients.Enzo + "> a atteint un objectif et obtient le rôle <@&" + ID.Roles.SPY + ">")
            client.channels.cache.get(ID.Channels.Levels).send({ embeds: [ levelGoalEmbed ] })

        }

        else {
            interaction.reply("Vous n'êtes pas autorisé à utiliser cette commande")
        }

    }

    if(commandName == "update") {

        if(interaction.user.id == ID.Clients.Sacha) {

            interaction.reply("__**Z-BOT 1.0.4**__ \n\nFix => Leveling System: Correction du ping dans l'embed Level Goal")

        }

        else {
            interaction.reply("Vous n'êtes pas autorisé à utiliser cette commande")
        }

    }

})