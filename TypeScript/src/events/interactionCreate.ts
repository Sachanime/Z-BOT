import { Events, Interaction } from "discord.js"
import { ping } from '../commands/ping'

export default {

    name: Events.InteractionCreate,

    execute(interaction: Interaction) {

        if(!interaction.isChatInputCommand()) { return }

        if(interaction.commandName == 'test') {
            ping(interaction)
        }

    }

} as const