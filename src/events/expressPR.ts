import { Request, Response } from 'express'
import { Client, TextChannel } from 'discord.js'
import { createGithubPREmbed, createSystemErrorEmbed } from '../embeds'
import { Systems } from '../enum'

export default {

    name: '/pullRequests',

    async execute(req: Request, res: Response, client: Client) {

        try {

            const logsChannel = client.channels.cache.get(process.env.DISCORD_LOGS_CHANNEL) as TextChannel
            const githubPREmbed = await createGithubPREmbed(req.body)

            if(req.body.action == 'opened') {
                githubPREmbed.setColor('Red')
                logsChannel.send({ embeds: [githubPREmbed] })
            }

            if(req.body.action == 'submitted') {

                if(req.body.review.state == 'approved') {
                    githubPREmbed.setFooter({ text: `Approved by ${req.body.sender.login} | ${req.body.repository.full_name}`, iconURL: req.body.sender.avatar_url })
                    githubPREmbed.setColor('Green')
                    logsChannel.send({ embeds: [githubPREmbed] })
                }

            }

            if(req.body.action == 'dismissed') {
                githubPREmbed.setFooter({ text: `Comitted by ${req.body.sender.login} | ${req.body.repository.full_name}`, iconURL: req.body.sender.avatar_url })
                githubPREmbed.setColor('Red')
            }

            if(req.body.action == 'closed') {
                githubPREmbed.setFooter({ text: `Merged by ${req.body.sender.login} | ${req.body.repository.full_name}`, iconURL: req.body.sender.avatar_url })
                githubPREmbed.setColor('Purple')
                logsChannel.send({ embeds: [githubPREmbed] })
            }

            res.status(200).send('OK')

        }

        catch(err) {
            const errorChannel = client.channels.cache.get(process.env.DISCORD_CHANNEL_LOGS) as TextChannel
            const systemErrorEmbed = await createSystemErrorEmbed(Systems.webhook, err)
            errorChannel.send({ embeds: [systemErrorEmbed] })
            console.log("System error reported")
        }

    }

}