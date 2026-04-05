const { Client, MessageType, ActivityType, AttachmentBuilder } = require("discord.js")
const { Low } = require("lowdb")
const { JSONFile } = require("lowdb/node")
const { createCanvas, loadImage, registerFont } = require("canvas")
const fs = require('fs')

const ID = require("./ID.json")
//const ID = require("../src-beta/ID-beta.json")
const Token = require("./token.json")
const package = require("../package.json")
const packagelock = require("../package-lock.json")
const { levelUpEmbed, levelGoalEmbed, createInfosEmbed, createLevelEmbed, createChangelogEmbed, createChangelogErrorEmbed, createConnectEmbed } = require("./embeds.js")
const { createTestCanvas, createLevelCanvas } = require("./canvas.js")

const client = new Client({ intents: [3276799] })
const adapter = new JSONFile(ID.DB.Main)
const db = new Low(adapter, { users: [], mainDoc: [] })
const voiceTimer = new Map()

registerFont('../Fonts/gg sans Bold.ttf', { family: 'Discord', weight: 'bold' })
registerFont('../Fonts/gg sans Medium.ttf', { family: 'Discord', weight: 'normal'})
registerFont('../Fonts/gg sans Regular.ttf', { family: 'Discord', weight: 'lighter' })
registerFont('../Fonts/gg sans Semibold.ttf', { family: 'Discord', weight: 'semibold' })

async function startBot() {
    
    client.login(Token.ZBOT)
    await db.read()

    let usersDb = db.data.users

    //Start System
    client.once("clientReady", async () => {

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
                        levelGoalEmbed.setDescription("<@" + levelUser.id + "> a atteint un objectif et obtient le rôle <@&" + ID.Roles.BestFriend + ">")
                        client.guilds.cache.get(ID.Servers.ZSPY).members.cache.get(levelUser.id).roles.add(ID.Roles.BestFriend)
                        levelUser.levelgoal = 30
                        await db.write()
                    }

                    if(levelUser.level == 30) {
                        levelGoalEmbed.setDescription("<@" + levelUser.id + "> a atteint un objectif et obtient le rôle <@&" + ID.Roles.SPY + ">")
                        client.guilds.cache.get(ID.Servers.ZSPY).members.cache.get(levelUser.id).roles.add(ID.Roles.SPY)
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

        if(commandName == "changelog") {

            try {

                const response = await fetch("https://api.github.com/repos/Sachanime/Z-BOT/releases/latest", {

                    headers: {
                        "Accept": "application/vnd.github+json",
                        "User-Agent": "DiscordBot"
                    }

                })

                if (!response.ok) throw new Error(`Erreur API GitHub: ${response.status} ${response.statusText}`)

                const data = await response.json()
                const changelogEmbed = createChangelogEmbed(data)
                interaction.reply({ embeds: [changelogEmbed] })

            }

            catch (err) {
                const changelogErrorEmbed = createChangelogErrorEmbed(err)
                interaction.reply({ embeds: [changelogErrorEmbed] })
            }

        }

        if(commandName == "oldTest"  && interaction.user.id == ID.Clients.Sacha) {

            await interaction.deferReply()

            const buffer = await createTestCanvas(client, ID)
            const attachment = new AttachmentBuilder(buffer, { name: 'test.png' })

            await interaction.editReply({ files: [attachment] })

        }

        if(commandName == "level" && interaction.user.id == ID.Clients.Sacha) {

            if(interaction.options.getUser("user")) {

                const userTarget = interaction.options.getUser("user")
                const userData = usersDb.find(u => u.id == userTarget.id)
                const xp = userData.xp
                const xpGoal = userData.xpgoal
                const level = userData.level

                await interaction.deferReply()

                const buffer = await createLevelCanvas(userTarget, xp, xpGoal, level)
                const attachment = new AttachmentBuilder(buffer, { name: "test.png" })

                await interaction.editReply({ files: [attachment] })

            }

            else {

                const userData = usersDb.find(u => u.id == interaction.user.id)
                const xp = userData.xp
                const xpGoal = userData.xpgoal
                const level = userData.level

                await interaction.deferReply()

                const buffer = await createLevelCanvas(interaction.user, xp, xpGoal, level)
                const attachment = new AttachmentBuilder(buffer, { name: "test.png" })

                await interaction.editReply({ files: [attachment] })

            }

        }

    })

    client.on("userUpdate", async (oldUser, newUser) => {

        if(usersDb.find(u => u.id == newUser.id)) {

            usersDb.find(u => u.id == newUser.id).username = newUser.username
            await db.write()

        }

        else {
            const newUserEntry = { id: newUser.id, username: newUser.username, xp: 0, xpgoal: 10, level: 0, levelgoal: 10 }
            usersDb.push(newUserEntry)
            await db.write()
        }

    })

    client.on("guildMemberRemove", async (member) => {

        usersDb = usersDb.filter((u => u.id !== member.user.id))
        await db.write()

    })

    client.on("voiceStateUpdate", async (oldState, newState) => {

        const member = newState.member.user

        if(usersDb.find(u => u.id == member.id)) { return }

        else {
            const newUser = { id: member.id, username: member.username, xp: 0, xpgoal: 10, level: 0, levelgoal: 10 }
            usersDb.push(newUser)
            await db.write()
        }

    })

    client.on("voiceStateUpdate", async (oldState, newState) => {

        const member = newState.member.user

        if(newState.channel != null && ID.voiceChannelsWhiteList.includes(newState.channel.id)) {
            voiceTimer.set(member.id, Date.now())
        }

        if(newState.channel == null && ID.voiceChannelsWhiteList.includes(oldState.channel.id)) {

            const joinTime = voiceTimer.get(member.id)
            const timeSpentMs = Date.now() - joinTime
            const timeSpent = Math.floor(timeSpentMs / 3600000)
            const xpGained = timeSpent * 2

            const levelUser = usersDb.find(u => u.id == member.id)

            if(levelUser) {

                levelUser.xp += xpGained
                await db.write()

                if(levelUser.xp >= levelUser.xpgoal) {

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
                            levelGoalEmbed.setDescription("<@" + levelUser.id + "> a atteint un objectif et obtient le rôle <@&" + ID.Roles.BestFriend + ">")
                            client.guilds.cache.get(ID.Servers.ZSPY).members.cache.get(levelUser.id).roles.add(ID.Roles.BestFriend)
                            levelUser.levelgoal = 30
                            await db.write()
                        }

                        if(levelUser.level == 30) {
                            levelGoalEmbed.setDescription("<@" + levelUser.id + "> a atteint un objectif et obtient le rôle <@&" + ID.Roles.SPY + ">")
                            client.guilds.cache.get(ID.Servers.ZSPY).members.cache.get(levelUser.id).roles.add(ID.Roles.SPY)
                            levelUser.levelgoal = 0
                            await db.write()
                        }

                        client.channels.cache.get(ID.Channels.Levels).send({ embeds: [ levelGoalEmbed ] })

                    }

                }

            }

        }

    })

}

startBot()