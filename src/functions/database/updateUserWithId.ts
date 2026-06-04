import { User } from 'discord.js'
import { prisma } from '../../prisma'

export async function updateUserWithId(user: User) {

    await prisma.users.update({

        where: { 
            id: user.id 
        },

        data: {
            username: user.username
        }

    })

}