import { Events, GuildMember, PartialGuildMember } from 'discord.js'
import { deleteUserWithId } from '../functions/database'

export default {

    name: Events.GuildMemberRemove,

    async execute(member: GuildMember | PartialGuildMember) {

        if(member.user.bot) { return }

        await deleteUserWithId(member.user.id)

    }

} as const