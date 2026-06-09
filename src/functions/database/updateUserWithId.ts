import { User } from 'discord.js'
import { prisma } from '../../prisma'

export async function updateUserWithId(user: User, xp: number, lvl: number) {

    await prisma.users.update({

        where: { 
            id: user.id ,
        },

        data: {
            username: user.username,
            xp: xp,
            lvl: lvl
        }

    })

}