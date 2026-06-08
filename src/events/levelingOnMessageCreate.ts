import { Events, Message, MessageType, Client, TextChannel, Role } from 'discord.js'
import { findUserWithId, updateUserWithId } from '../functions/database'
import { createLevelUpEmbed, createLevelGoalEmbed, createSystemErrorEmbed } from '../embeds'
import { Systems } from '../enum'

export default {

    name: Events.MessageCreate,

    async execute(message: Message, client: Client) {

        try {
        
            if(message.author.bot) { return }
            if(message.type == MessageType.ChannelPinnedMessage) { return }

            const user = await findUserWithId(message.author.id)

            if(!user) { return }

            const userXp = user.xp + 1
            const nextLevel = user.lvl + 1
            const xpGoal = 5 * nextLevel * (nextLevel + 1)
            const lvlChannel = client.channels.cache.get(process.env.DISCORD_CHANNEL_LEVEL) as TextChannel
            const server = client.guilds.cache.get(process.env.DISCORD_SERVER)
            let roleReward: Role

            await updateUserWithId(message.author, userXp, user.lvl)

            if(userXp == xpGoal) {

                await updateUserWithId(message.author, userXp, nextLevel)
                const levelUpEmbed = await createLevelUpEmbed(message.author, nextLevel)
                lvlChannel.send({ embeds: [levelUpEmbed] })

                if(nextLevel == 5) {
                    roleReward = server.roles.cache.get(process.env.DISCORD_ROLEREWARD_TIER1)
                    const levelGoalEmbed = await createLevelGoalEmbed(message.author, roleReward)
                    lvlChannel.send({ embeds: [levelGoalEmbed] })
                    message.member.roles.add(roleReward)
                }

                if(nextLevel == 20) {
                    roleReward = server.roles.cache.get(process.env.DISCORD_ROLEREWARD_TIER2)
                    const levelGoalEmbed = await createLevelGoalEmbed(message.author, roleReward)
                    lvlChannel.send({ embeds: [levelGoalEmbed] })
                    message.member.roles.add(roleReward)
                }

                if(nextLevel == 30) {
                    roleReward = server.roles.cache.get(process.env.DISCORD_ROLEREWARD_TIER3)
                    const levelGoalEmbed = await createLevelGoalEmbed(message.author, roleReward)
                    lvlChannel.send({ embeds: [levelGoalEmbed] })
                    message.member.roles.add(roleReward)
                }

            }

        }

        catch(err) {
            const errorChannel = client.channels.cache.get(process.env.DISCORD_CHANNEL_LOGS) as TextChannel
            const systemErrorEmbed = await createSystemErrorEmbed(Systems.messageLeveling, err)
            errorChannel.send({ embeds: [systemErrorEmbed] })
            console.log("System error reported")
        }
        
    }

} as const