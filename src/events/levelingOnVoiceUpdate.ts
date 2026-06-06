import { Events, VoiceState, Role, Client, TextChannel } from 'discord.js'
import { voiceTimer } from '..'
import { findUserWithId, updateUserWithId } from '../functions/database'
import { createLevelUpEmbed, createLevelGoalEmbed } from '../embeds'

export default {

    name: Events.VoiceStateUpdate,

    async execute(oldState: VoiceState, newState: VoiceState, client: Client) {

        const voiceChannelWhiteListString = process.env.DISCORD_VOICECHANNEL_WHITELIST
        const voiceChannelWhiteListArray = JSON.parse(voiceChannelWhiteListString) as Array<string>

        if(newState.channel != null && voiceChannelWhiteListArray.includes(newState.channel.id)) {
            const member = newState.member.user
            if(member.bot) { return }
            voiceTimer.set(member.id, Date.now())
        }

        if(newState.channel == null && voiceChannelWhiteListArray.includes(oldState.channel.id)) {

            const member = oldState.member.user
            if(member.bot) { return }

            const joinTime = voiceTimer.get(member.id)
            const timeSpentMs = Date.now() - joinTime
            const timeSpent = Math.floor(timeSpentMs / 3600000)
            const xpGained = timeSpent * 2
            const user = await findUserWithId(member.id)
            const totalXp = user.xp + xpGained
            const newLevel = Math.floor((Math.sqrt(20 * totalXp + 25) - 5) / 10 )
            const server = client.guilds.cache.get(process.env.DISCORD_SERVER)
            const lvlChannel = client.channels.cache.get(process.env.DISCORD_LEVEL_CHANNEL) as TextChannel
            let roleReward: Role

            await updateUserWithId(member, totalXp, newLevel)
            
            if(newLevel > user.lvl) {

                const levelUpEmbed = await createLevelUpEmbed(member, newLevel)
                lvlChannel.send({ embeds: [levelUpEmbed] })

                if(user.lvl < 5 && newLevel >= 5) {
                    roleReward = server.roles.cache.get(process.env.DISCORD_FRIEND_ROLEREWARD)
                    const levelGoalEmbed = await createLevelGoalEmbed(member, roleReward)
                    lvlChannel.send({ embeds: [levelGoalEmbed] })
                    newState.member.roles.add(roleReward)
                }

                if(user.lvl < 20 && newLevel >= 20) {
                    roleReward = server.roles.cache.get(process.env.DISCORD_BESTFRIEND_ROLEREWARD)
                    const levelGoalEmbed = await createLevelGoalEmbed(member, roleReward)
                    lvlChannel.send({ embeds: [levelGoalEmbed] })
                    newState.member.roles.add(roleReward)
                }

                if(user.lvl < 30 && newLevel >= 30) {
                    roleReward = server.roles.cache.get(process.env.DISCORD_SPY_ROLEREWARD)
                    const levelGoalEmbed = await createLevelGoalEmbed(member, roleReward)
                    lvlChannel.send({ embeds: [levelGoalEmbed] })
                    newState.member.roles.add(roleReward)
                }

            }

        }

    }

} as const