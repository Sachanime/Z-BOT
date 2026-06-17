import { Client, Events, ActivityType, PresenceUpdateStatus } from "discord.js"

export default {

    name: Events.ClientReady,

    async execute(client: Client<true>) {

        await client.application.fetch()
        console.log(`Connected to ${client.application.name}`)
        client.user.setPresence({ activities: [{ name: "Development", type: ActivityType.Watching }], status: PresenceUpdateStatus.DoNotDisturb })

    }

} as const