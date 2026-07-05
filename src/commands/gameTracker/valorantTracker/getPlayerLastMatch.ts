import { ChatInputCommandInteraction, AttachmentBuilder } from 'discord.js'
import { createValorantMatchSummaryCanvas } from '../../../canvas'
import axios from 'axios'
import { ValorantAPIMatchData, ValorantAPIMMRHistoryData } from '../../../interfaces'
import { findUserWithId } from '../../../functions/database'
import { createDatabaseErrorEmbed, createTrackerErrorEmbed } from '../../../embeds'

export async function getPlayerLastMatch(interaction: ChatInputCommandInteraction) {

    await interaction.deferReply()

    let targetPlayer = interaction.options.getUser('player')

    if(!targetPlayer) {
        targetPlayer = interaction.user
    }

    const targetPlayerData = await findUserWithId(targetPlayer.id)

    if(!targetPlayerData) {
        const databaseErrorEmbed = createDatabaseErrorEmbed()
        await interaction.editReply({ embeds: [databaseErrorEmbed] })
        return
    }

    const targetPlayerValoPuuid = targetPlayerData.valoPuuid

    if(!targetPlayerValoPuuid) {
        const trackerErrorEmbed = createTrackerErrorEmbed()
        await interaction.editReply({ embeds: [trackerErrorEmbed] })
        return
    }

    const axiosConfig = {
        headers: {
            'Authorization': 'HDEV-df759b73-b4f0-4f74-bace-4d46e2ed5dd9'
        }
    }
    
    const axiosResponseMMRHistoryEndpoint = await axios.get(`https://api.henrikdev.xyz/valorant/v1/by-puuid/mmr-history/eu/${targetPlayerValoPuuid}`, axiosConfig)
    const valorantAPIMMRHistoryData = axiosResponseMMRHistoryEndpoint.data as ValorantAPIMMRHistoryData
    const matchId = valorantAPIMMRHistoryData.data[0].match_id
    const axiosResponseMatchEndpoint = await axios.get(`https://api.henrikdev.xyz/valorant/v2/match/${matchId}`, axiosConfig)
    const valorantAPIMatchData = axiosResponseMatchEndpoint.data as ValorantAPIMatchData

    const buffer = await createValorantMatchSummaryCanvas(valorantAPIMatchData.data, targetPlayerValoPuuid)
    if(buffer == undefined) { await interaction.editReply('Error') }
    else {const attachment = new AttachmentBuilder(buffer, { name: "matchSummary.png" })
    await interaction.editReply({ files: [attachment] })}

}