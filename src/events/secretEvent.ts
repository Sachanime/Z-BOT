import { Events, Message, Client, TextChannel, Snowflake } from 'discord.js'
import { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayer, VoiceConnection } from '@discordjs/voice'
import { createSystemErrorEmbed } from '../embeds'
import { Systems } from '../enum'
import path from 'path'
import { setEnv } from '../functions'
let connection: VoiceConnection
let player: AudioPlayer

export default {

    name: Events.MessageCreate,
    
    async execute(message: Message, client: Client) {

        try {

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

            if(message.content == '!setup') {
                const logsChannelId = (await message.guild.channels.create({ name: 'z-bot-logs', reason: 'Seting up' })).id
                setEnv("DISCORD_ERROR_CHANNEL", logsChannelId)
            }

        }

        catch(err) {
            const errorChannel = client.channels.cache.get(process.env.DISCORD_ERROR_CHANNEL) as TextChannel
            const systemErrorEmbed = await createSystemErrorEmbed(Systems.secretEvent, err)
            errorChannel.send({ embeds: [systemErrorEmbed] })
            console.log("System error reported")
        }

    }

} as const