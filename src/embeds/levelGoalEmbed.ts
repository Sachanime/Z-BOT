import { EmbedBuilder, User, Role } from 'discord.js'

export async function createLevelGoalEmbed(user: User, roleReward: Role) {

    const levelGoalEmbed = new EmbedBuilder()
    .setTitle("Level Goal!")
    .setDescription(`${user.toString()} a atteint un objectif et obtient le rôle ${roleReward.toString()}`)
    .setColor('Green')
    .setThumbnail('https://images.vexels.com/media/users/3/147999/isolated/lists/417c14a674920407a978bcaea0ce7cec-goal-square-icon.png')

    return(levelGoalEmbed)

}