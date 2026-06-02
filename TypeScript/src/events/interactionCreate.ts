import { ChatInputCommandInteraction, Events } from "discord.js"

export default {

    name: Events.InteractionCreate,

    execute(interaction: ChatInputCommandInteraction) {

        if(!interaction.isChatInputCommand()) { return }

    }

}