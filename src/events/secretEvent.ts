import { Events, Message } from 'discord.js'
import { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayer, VoiceConnection } from '@discordjs/voice'
import path from 'path'
let connection: VoiceConnection
let player: AudioPlayer

export default {

    name: Events.MessageCreate,
    
    async execute(message: Message) {

        if(message.content == "!join") {

            connection = joinVoiceChannel({
                channelId: message.member.voice.channel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator,
            })

        }

        if(message.content == '!play') {

            player = createAudioPlayer()
            const resourcePath = path.join(__dirname, '..', '..', 'assets', 'sounds', 'loruleCastle.mp3')
            const resource = createAudioResource(resourcePath)

            connection.subscribe(player)
            player.play(resource)

        }

        if(message.content == '!pause') {
            player.pause()
        }

        if(message.content == '!resume') {
            player.unpause()
        }

        if(message.content == '!stop') {
            player.stop()
        }

        if(message.content == '!leave') {
            connection.destroy()
        }

    }

} as const