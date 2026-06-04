import { prisma } from '../../prisma'

export async function deleteUserWithId(userId: string) {

    await prisma.users.delete({
        where: { id: userId }
    })

}