import { Client, Events, ActivityType } from "discord.js"

export default {

    name: Events.ClientReady,

    async execute(client: Client) {
        await client.application.fetch()
        console.log(`Connected to ${client.application.name}`)
        client.user.setPresence({ activities: [{ name: "Self development", type: ActivityType.Watching }] })
    }

} as const 