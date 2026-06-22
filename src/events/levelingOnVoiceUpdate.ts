import { Events, VoiceState, Role, Client, TextChannel, Guild } from 'discord.js'
import { voiceTimer } from '..'
import { findUserWithId, updateUserWithId } from '../functions/database'
import { createLevelUpEmbed, createLevelGoalEmbed, createSystemErrorEmbed, createDatabaseErrorEmbed } from '../embeds'
import { Systems } from '../enum'

export default {

    name: Events.VoiceStateUpdate,

    async execute(oldState: VoiceState, newState: VoiceState, client: Client) {

        try {
        
            if(!oldState.member) { return }
            if(!newState.member) { return }

            const voiceChannelWhiteListString = process.env.DISCORD_VOICECHANNEL_WHITELIST as string
            const voiceChannelWhiteListArray = JSON.parse(voiceChannelWhiteListString) as Array<string>

            if(newState.channel != null && voiceChannelWhiteListArray.includes(newState.channel.id)) {
                const member = newState.member.user
                if(member.bot) { return }
                voiceTimer.set(member.id, Date.now())
            }

            if(oldState.channel != null && voiceChannelWhiteListArray.includes(oldState.channel.id)) {

                const member = oldState.member.user
                if(member.bot) { return }

                const joinTime = voiceTimer.get(member.id)

                if(!joinTime) { return }

                voiceTimer.delete(member.id)

                const server = client.guilds.cache.get(process.env.DISCORD_SERVER as string) as Guild
                const timeSpentMs = Date.now() - joinTime
                const timeSpent = Math.floor(timeSpentMs / 3600000)
                const xpGained = timeSpent * 2
                const user = await findUserWithId(member.id)
                

                if(!user) {
                    const databaseErrorEmbed = createDatabaseErrorEmbed()
                    const logsChannel = server.channels.cache.get(process.env.DISCORD_CHANNEL_LOGS as string) as TextChannel
                    logsChannel.send({ embeds: [databaseErrorEmbed] })
                    return
                }

                const totalXp = user.xp + xpGained
                const newLevel = Math.floor((Math.sqrt(20 * totalXp + 25) - 5) / 10 )
                const lvlChannel = client.channels.cache.get(process.env.DISCORD_CHANNEL_LEVEL as string) as TextChannel
                let roleReward: Role

                await updateUserWithId(member, totalXp, newLevel)
            
                if(newLevel > user.lvl) {

                    const levelUpEmbed = await createLevelUpEmbed(member, newLevel)
                    lvlChannel.send({ embeds: [levelUpEmbed] })

                    if(user.lvl < 5 && newLevel >= 5) {
                        roleReward = server.roles.cache.get(process.env.DISCORD_ROLEREWARD_TIER1 as string) as Role
                        const levelGoalEmbed = await createLevelGoalEmbed(member, roleReward)
                        lvlChannel.send({ embeds: [levelGoalEmbed] })
                        newState.member.roles.add(roleReward)
                    }

                    if(user.lvl < 20 && newLevel >= 20) {
                        roleReward = server.roles.cache.get(process.env.DISCORD_ROLEREWARD_TIER2 as string) as Role
                        const levelGoalEmbed = await createLevelGoalEmbed(member, roleReward)
                        lvlChannel.send({ embeds: [levelGoalEmbed] })
                        newState.member.roles.add(roleReward)
                    }

                    if(user.lvl < 30 && newLevel >= 30) {
                        roleReward = server.roles.cache.get(process.env.DISCORD_ROLEREWARD_TIER3 as string) as Role
                        const levelGoalEmbed = await createLevelGoalEmbed(member, roleReward)
                        lvlChannel.send({ embeds: [levelGoalEmbed] })
                        newState.member.roles.add(roleReward)
                    }

                }

            }

        }

        catch(err) {
            const errorChannel = client.channels.cache.get(process.env.DISCORD_CHANNEL_LOGS as string) as TextChannel
            const systemErrorEmbed = await createSystemErrorEmbed(Systems.voiceLeveling, err)
            errorChannel.send({ embeds: [systemErrorEmbed] })
            console.log("System error reported")
        }

    }

} as const