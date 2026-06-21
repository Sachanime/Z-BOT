import { Client, Events, Interaction, TextChannel } from "discord.js"
import { createSystemErrorEmbed } from '../embeds'
import { Systems } from '../enum'
import {
    executeInfosSlashCommand,
    executeChangelogSlashCommand,
    executeLevelSlashCommand,
    executeSetupSlashCommand,
    executeAdminLevelSlashCommand,
} from '../commands'
import { getValorantPlayerData, getZanayLastMatch } from '../commands/gameTracker/valorantTracker'

export default {

    name: Events.InteractionCreate,

    async execute(interaction: Interaction, client: Client<true>) {

        try {

            if(!interaction.isChatInputCommand()) { return }

            if(interaction.commandName == 'infos') {
                executeInfosSlashCommand(interaction, client)
            }

            if(interaction.commandName == 'changelog') {
                executeChangelogSlashCommand(interaction)
            }

            if(interaction.commandName == 'level') {
                executeLevelSlashCommand(interaction)
            }

            if(interaction.commandName == 'setup') {
                executeSetupSlashCommand(interaction, client)
            }

            if(interaction.commandName == 'admin_level') {
                executeAdminLevelSlashCommand(interaction)
            }

            if(interaction.commandName == 'tracker') {
                getValorantPlayerData(interaction)
            }

            if(interaction.commandName == 'zanay') {
                getZanayLastMatch(interaction)
            }

        }

        catch(err) {
            const errorChannel = client.channels.cache.get(process.env.DISCORD_CHANNEL_LOGS as string) as TextChannel
            const systemErrorEmbed = await createSystemErrorEmbed(Systems.command, err)
            errorChannel.send({ embeds: [systemErrorEmbed] })
            console.log("System error reported")
        }

    }

} as const