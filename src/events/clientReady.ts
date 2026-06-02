import { Client, Events, ActivityType } from "discord.js"
import path from 'path'
import { displayBanner } from '../functions/displayBanner'

export default {

    name: Events.ClientReady,

    async execute(client: Client) {

        const bannersPath = path.join(__dirname, '..', '..', 'assets', 'banners')
        const editorBannerPath = path.join(bannersPath, 'editorBanner.txt')
        const appBannerPath = path.join(bannersPath, 'appBanner.txt')

        await displayBanner(editorBannerPath)
        await displayBanner(appBannerPath)
        await client.application.fetch()
        console.log(`Connected to ${client.application.name}`)
        client.user.setPresence({ activities: [{ name: "Self development", type: ActivityType.Watching }] })

    }

} as const