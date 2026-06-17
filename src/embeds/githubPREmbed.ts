import { EmbedBuilder } from 'discord.js'

export async function createGithubPREmbed(data: any) {

    const labelsArray = data.pull_request.labels.map((label: any) => label.name)
    const assignedsArray = data.pull_request.assignees.map((assigned: any) => assigned.name)

    const labelsString = labelsArray.join(', ')
    const assignedsString = assignedsArray.join(', ')

    const githubPREmbed = new EmbedBuilder()
    .setTitle(data.pull_request.title)
    .setDescription(data.pull_request.body)
    .setAuthor({ name: "Pull Request", iconURL: 'https://github.com/fluidicon.png' })
    .setFooter({ text: `Openned by ${data.sender.login} | ${data.repository.full_name}`, iconURL: data.sender.login })
    .setURL(data.pull_request.html_url)
    .setColor('Blue')
    .addFields([
        { inline: true, name: "Labels", value: labelsString },
        { inline: true, name: "Assigned to", value: assignedsString }
    ])

    return(githubPREmbed)

}