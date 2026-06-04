import { Events, User } from 'discord.js'
import { updateUserWithId } from '../functions/database'

export default {

    name: Events.UserUpdate,

    async execute(user: User) {
        
        if(user.bot) { return }

        await updateUserWithId(user)

    }

} as const