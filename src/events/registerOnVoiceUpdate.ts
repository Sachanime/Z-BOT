import { Events, VoiceState, Client, TextChannel } from 'discord.js'
import { VoiceConnection, joinVoiceChannel, AudioPlayer, createAudioPlayer, createAudioResource } from '@discordjs/voice'
import path from 'path'
import { findUserWithId, createUser } from '../functions/database'
import { createSystemErrorEmbed } from '../embeds'
import { Systems } from '../enum'

let connection: VoiceConnection
let player: AudioPlayer

export default {

    name: Events.VoiceStateUpdate,

    async execute(newState: VoiceState, client: Client) {

        try {

            if(newState.channel != null) {

                const member = newState.member

                if(member.user.bot) { return }

                const user = await findUserWithId(member.id)

                if(user) { return }

                else {

                    await createUser(member.user)

                    const soundPath = path.join(__dirname, '..', '..', 'assets', 'sounds', 'voiceUserRecording.mp3')
                    const resource = createAudioResource(soundPath)

                    connection = joinVoiceChannel({ channelId: newState.channel.id, guildId: newState.guild.id, adapterCreator: newState.guild.voiceAdapterCreator })
                    player = createAudioPlayer()

                    connection.subscribe(player)
                    setTimeout(() => player.play(resource), 500)
                    setTimeout(() => connection.destroy(), 3000)

                }

            }

        }

        catch(err) {
            const errorChannel = client.channels.cache.get(process.env.DISCORD_ERROR_CHANNEL) as TextChannel
            const systemErrorEmbed = await createSystemErrorEmbed(Systems.voiceRegistration, err)
            errorChannel.send({ embeds: [systemErrorEmbed] })
            console.log("System error reported")
        }

    }

} as const