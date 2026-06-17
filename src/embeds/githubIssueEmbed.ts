import { EmbedBuilder } from 'discord.js'

export async function createGithubIssueEmbed(data: any) {

    const labelsArray = data.issue.labels.map((label: any) => label.name)
    const assignedsArray = data.issue.assignees.map((assigned: any) => assigned.login )

    const labelsString = labelsArray.join(', ')
    const assignedsString = assignedsArray.join(', ')

    const githubIssueEmbed = new EmbedBuilder()
    .setTitle(data.issue.title)
    .setDescription(data.issue.body)
    .setAuthor({ name: "Issue", iconURL: 'https://github.com/fluidicon.png' })
    .setFooter({ text: `Openned by ${data.sender.login} | ${data.repository.full_name}`, iconURL: data.sender.avatar_url })
    .setURL(data.issue.html_url)
    .setColor('Red')
    .addFields([
        { inline: true, name: "Labels", value: labelsString },
        { inline: true, name: "Assigned to", value: assignedsString }
    ])

    return(githubIssueEmbed)

}