const { Client, MessageType, ActivityType } = require("discord.js")
const { Low } = require("lowdb")
const { JSONFile } = require("lowdb/node")
//const { createCanvas, loadImage } = require("canvas")

const ID = require("./ID-beta.json")
const Token = require("./token.json")
const package = require("./package.json")
const packagelock = require("./package-lock.json")
const { levelUpEmbed, levelGoalEmbed, createInfosEmbed, createLevelEmbed } = require("./embeds.js")

const client = new Client({ intents: [3276799] })
const adapter = new JSONFile(ID.DB.Main)
const db = new Low(adapter, { users: [], mainDoc: [] })
//const canvas = createCanvas(200, 200)
//const ctx = canvas.getContext("2d")

async function startBot() {
    
    client.login(Token.Beta)
    await db.read()

    let usersDb = db.data.users

    //Start System
    client.once("clientReady", () => {

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
        if(usersDb.find(u => u.id == message.author.id)) { return }

        else{
            const newUser = { id: message.author.id, username: message.author.username, xp: 0, xpgoal: 10, level: 0, levelgoal: 10 }
            usersDb.push(newUser)
            await db.write()
            message.react(ID.Emotes.Registered)
        }

    })

    //Leveling System
    client.on("messageCreate", async (message) => {

        //Ignore System
        if(message.author.bot) { return }
        if(message.type == MessageType.ChannelPinnedMessage) { return }

        //Alogrithme
        const levelUser = usersDb.find(u => u.id == message.author.id)
        if(levelUser) {

            levelUser.xp += 1
            await db.write()

            if(levelUser.xp == levelUser.xpgoal) {

                levelUpEmbed.setDescription("<@" + levelUser.id + "> vient de passer niveau " + (levelUser.level + 1))

                levelUser.xp = 0
                levelUser.level += 1
                levelUser.xpgoal += 10
                await db.write()
                client.channels.cache.get(ID.Channels.Levels).send({ embeds: [ levelUpEmbed ] })

                if(levelUser.level == levelUser.levelgoal) {

                    if(levelUser.level == 5) {
                        levelGoalEmbed.setDescription("<@" + levelUser.id + "> a atteint un objectif et obtient le rôle <@&" + ID.Roles.Friend + ">")
                        client.guilds.cache.get(ID.Servers.ZSPY).members.cache.get(levelUser.id).roles.add(ID.Roles.Friend)
                        levelUser.levelgoal = 20
                        await db.write()
                    }

                    if(levelUser.level == 20) {
                        levelGoalEmbed.setDescription("<@" + levelUser.id + "> a atteint un objectif et obtient le rôle <@&" + ID.Roles.SPY + ">")
                        client.guilds.cache.get(ID.Servers.ZSPY).members.cache.get(levelUser.id).roles.add(ID.Roles.SPY)
                        levelUser.levelgoal = 30
                        await db.write()
                    }

                    if(levelUser.level == 30) {
                        levelGoalEmbed.setDescription("<@" + levelUser.id + "> a atteint un objectif et obtient le rôle <@&" + ID.Roles.BestFriend + ">")
                        client.guilds.cache.get(ID.Servers.ZSPY).members.cache.get(levelUser.id).roles.add(ID.Roles.BestFriend)
                        levelUser.levelgoal = 0
                        await db.write()
                    }

                    client.channels.cache.get(ID.Channels.Levels).send({ embeds: [ levelGoalEmbed ] })

                }

            }

        }

    })

    //Command System
    client.on("interactionCreate", async interaction => {

        const { commandName } = interaction

        if(commandName == "infos") {

            const infosEmbed = createInfosEmbed(client, package, packagelock)
            interaction.reply({ embeds: [infosEmbed] })

        }

        if(commandName == "level") {

            const levelUser = usersDb.find(u => u.id == interaction.user.id)
            const levelEmbed = createLevelEmbed(levelUser)
            interaction.reply({ embeds: [levelEmbed] })

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

    })

    client.on("userUpdate", async (oldUser, newUser) => {

        usersDb.find(u => u.id == newUser.id).username = newUser.username
        await db.write()

    })

    client.on("guildMemberRemove", async (member) => {

        usersDb = usersDb.filter((u => u.id !== member.user.id))
        await db.write()

    })

}

startBot()