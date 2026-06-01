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

function createChangelogEmbed(data) {

    return new EmbedBuilder()
    .setTitle(data.name)
    .setDescription(data.body)
    .setColor("Blue")

}

function createChangelogErrorEmbed(err) {

    return new EmbedBuilder()
    .setTitle("New release")
    .setDescription("Erreur lors de la récupération du changelog \nVous pouvez y accéder avec la commande `/changelog` \n\n```\n" + err + "\n```")
    .setColor("Red")

}

function createGithubIssueEmebed(data) {

    const labelsArray = data.issue.labels.map(label => label.name)
    const assignedsArray = data.issue.assignees.map(assigned => assigned.login)

    const labelsString = labelsArray.join(", ")
    const assignedsString = assignedsArray.join(", ")

    return new EmbedBuilder()
    .setTitle(data.issue.title)
    .setDescription(data.issue.body)
    .setAuthor({ name: "Issue", iconURL: "https://github.com/fluidicon.png" })
    .setFooter({ text: "Openned by " + data.sender.login + " | " + data.repository.full_name, iconURL: data.sender.avatar_url })
    .setURL(data.issue.html_url)
    .setColor("Red")
    .addFields([
        { inline: true, name: "Labels", value: labelsString },
        { inline: true, name: "Assigned to", value: assignedsString }
    ])

}

function createGithubPREmbed(data) {

    const labelsArray = data.pull_request.labels.map(label => label.name)
    const assignedsArray = data.pull_request.assignees.map(assigned => assigned.login)
    const reviewersArray = data.pull_request.requested_reviewers.map(reviewer => reviewer.login)

    const labelsString = labelsArray.join(", ")
    const assignedsString = assignedsArray.join(", ")
    const reviewersString = reviewersArray.join(", ")

    return new EmbedBuilder()
    .setTitle(data.pull_request.title)
    .setDescription(data.pull_request.body)
    .setAuthor({ name: "Pull Request", iconURL: "https://github.com/fluidicon.png" })
    .setFooter({ text: "Openned by " + data.sender.login + " | " + data.repository.full_name, iconURL: data.sender.avatar_url })
    .setURL(data.pull_request.html_url)
    .setColor("Blue")
    .addFields([
        { inline: true, name: "Labels", value: labelsString },
        { inline: true, name: "Assigned to", value: assignedsString },
        { inline: true, name: "Requested reviewers", value: reviewersString }
    ])

}

module.exports = { levelUpEmbed, levelGoalEmbed, createInfosEmbed, createChangelogEmbed, createChangelogErrorEmbed, createGithubIssueEmebed, createGithubPREmbed }