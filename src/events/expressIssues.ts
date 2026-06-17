import { Client, TextChannel } from 'discord.js'
import { Request, Response } from 'express'
import { createGithubIssueEmbed, createSystemErrorEmbed } from "../embeds"
import { Systems } from '../enum'

export default {

    name: '/issues',

    async execute(req: Request, res: Response, client: Client) {

        try {

            const logsChannel = client.channels.cache.get(process.env.DISCORD_CHANNEL_LOGS as string) as TextChannel
            const githubIssueEmbed = await createGithubIssueEmbed(req.body)

            if(req.body.action == 'opened') {
                logsChannel.send({ embeds: [githubIssueEmbed] })
            }

            res.status(200).send('OK')

        }

        catch(err) {
            const errorChannel = client.channels.cache.get(process.env.DISCORD_CHANNEL_LOGS as string) as TextChannel
            const systemErrorEmbed = await createSystemErrorEmbed(Systems.webhook, err)
            errorChannel.send({ embeds: [systemErrorEmbed] })
            console.log("System error reported")
        }

    }

}