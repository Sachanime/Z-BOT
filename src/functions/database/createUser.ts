import { User } from 'discord.js'
import { prisma } from '../../prisma'

export async function createUser(user: User) {

    await prisma.users.create({
        data: {
            id: user.id,
            username: user.username,
            xp: 0
        }
    })

}