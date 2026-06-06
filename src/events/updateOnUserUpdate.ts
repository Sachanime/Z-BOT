import { Events, User } from 'discord.js'
import { findUserWithId, updateUserWithId } from '../functions/database'

export default {

    name: Events.UserUpdate,

    async execute(user: User) {
        
        if(user.bot) { return }

        const findedUser = await findUserWithId(user.id)
        await updateUserWithId(user, findedUser.xp, findedUser.lvl)

    }

} as const