import { Events, VoiceState } from 'discord.js'
import { VoiceConnection, joinVoiceChannel, AudioPlayer, createAudioPlayer, createAudioResource } from '@discordjs/voice'
import path from 'path'
import { findUserWithId, createUser } from '../functions/database'

let connection: VoiceConnection
let player: AudioPlayer

export default {

    name: Events.VoiceStateUpdate,

    async execute(newState: VoiceState) {

        if(newState.channel != null) {

            const member = newState.member

            if(member.user.bot) { return }

            const user = await findUserWithId(member.id)

            if(user) { return }

            else {

                const soundPath = path.join(__dirname, '..', '..', 'sounds', 'voiceUserRecording.mp3')
                const resource = createAudioResource(soundPath)

                connection = joinVoiceChannel({ channelId: newState.channel.id, guildId: newState.guild.id, adapterCreator: newState.guild.voiceAdapterCreator })
                player = createAudioPlayer()

                connection.subscribe(player)
                setTimeout(() => player.play(resource), 500)
                setTimeout(() => connection.destroy(), 3000)

                await createUser(member.user)

            }

        }

    }

} as const