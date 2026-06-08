import { Client, TextChannel } from 'discord.js'
import { Request, Response } from 'express'
import { createGithubIssueEmbed } from "../embeds"

export default {

    name: '/issues',

    async execute(req: Request, res: Response, client: Client) {

        const logsChannel = client.channels.cache.get(process.env.DISCORD_LOGS_CHANNEL) as TextChannel
        const githubIssueEmbed = await createGithubIssueEmbed(req.body)

        if(req.body.action == 'opened') {
            logsChannel.send({ embeds: [githubIssueEmbed] })
        }

        res.status(200).send('OK')

    }

}