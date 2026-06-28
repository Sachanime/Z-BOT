import { ChatInputCommandInteraction, User } from 'discord.js'
//import axios, { isCancel, AxiosError} from 'axios'
import { findUserWithId } from '../../../functions/database'

export async function getValorantPlayerData(interaction: ChatInputCommandInteraction) {

    await interaction.deferReply()

    const user = interaction.options.getUser('user') as User
    const userData = await findUserWithId(user.id)
    //const userValoName = userData.valoName
    //const userValoTag = userData.valoTag
    const axiosConfig = {
        headers: {
            'Authorization': 'HDEV-df759b73-b4f0-4f74-bace-4d46e2ed5dd9'
        }
    }

    //const userValoData = await axios.get(`https://api.henrikdev.xyz/valorant/v1/account/${userValoName}/${userValoTag}`, axiosConfig )
    //const userValoPuuid = userValoData.data.data.puuid
    //await interaction.editReply(`PUUID : ${userValoPuuid}`)

}