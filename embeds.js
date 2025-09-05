const { EmbedBuilder } = require("discord.js")

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

function createInfosEmbed(client, package, packagelock) {

    return new EmbedBuilder()
    .setTitle("Z-BOT")
    .setColor("Blue")
    .setThumbnail(client.user.avatarURL())
    .setDescription(
        package.description + "\n\n" +
        "__**Versions**__" + "\n\n" +
        "Z-BOT : " + package.version + "\n\n" +
        "Node.js : " + process.version + "\n\n" +
        "Discord.js : " + packagelock.packages["node_modules/discord.js"].version + "\n" +
        "lowdb : " + packagelock.packages["node_modules/lowdb"].version
    )

}

function createLevelEmbed(levelUser) {

    return new EmbedBuilder()
    .setTitle("Level")
    .setDescription(
        "Level : " + levelUser.level.toString() + "\n\n" +
        "XP : " + levelUser.xp.toString() + "\n\n" +
        "Prochain niveau à " + levelUser.xpgoal.toString() + "xp \n\n" +
        "Prochaine récompense au niveau " + levelUser.levelgoal.toString()
    )

}

module.exports = { levelUpEmbed, levelGoalEmbed, createInfosEmbed, createLevelEmbed }