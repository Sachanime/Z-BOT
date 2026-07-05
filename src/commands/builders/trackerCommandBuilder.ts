import { SlashCommandBuilder } from 'discord.js'

const trackerCommandBuilder = new SlashCommandBuilder()
.setName('track')
.setDescription("Game tracker")
.addSubcommandGroup(subCommandGroup => subCommandGroup
    .setName('valorant')
    .setDescription("Valorant Tracker")
    .addSubcommand(subCommand => subCommand
        .setName('last_match')
        .setDescription("Get last match scoreboard")
        .addUserOption(userOption => userOption
            .setName("player")
            .setDescription("Registered player")
            .setRequired(false)
        )
    )
)

export { trackerCommandBuilder }