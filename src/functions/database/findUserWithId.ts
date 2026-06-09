import { prisma } from '../../prisma'

export async function findUserWithId(userId: string) {

    const user = await prisma.users.findUnique({
        where: { id: userId }
    })

    return(user)

}