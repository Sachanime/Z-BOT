import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js'

const adminLevelCommandBuilder = new SlashCommandBuilder()
.setName('admin_level')
.setDescription("Modifier le niveau ou les points XP d'un membre")
.addSubcommand(subCommand => subCommand
    .setName('give_level')
    .setDescription("Donner des niveaux à un membre")
    .addUserOption(option => option
        .setName('member')
        .setDescription("Membre")
        .setRequired(true)
    )
    .addNumberOption(option => option
        .setName('amount')
        .setDescription("Montant")
        .setRequired(true)
    )
)
.addSubcommand(subCommand => subCommand
    .setName('give_xp')
    .setDescription("Donner des points XP à un membre")
    .addUserOption(option => option
        .setName('member')
        .setDescription("Membre")
        .setRequired(true)
    )
    .addNumberOption(option => option
        .setName('amount')
        .setDescription("Montant")
        .setRequired(true)
    )
)
.addSubcommand(subCommand => subCommand
    .setName('remove_level')
    .setDescription("Retirer des niveaux à un membre")
    .addUserOption(option => option
        .setName('member')
        .setDescription('Membre')
        .setRequired(true)
    )
    .addNumberOption(option => option
        .setName('amount')
        .setDescription("Montant")
        .setRequired(true)
    )
)
.addSubcommand(subCommand => subCommand
    .setName('remove_xp')
    .setDescription("Retirer des points XP à un membre")
    .addUserOption(option => option
        .setName('member')
        .setDescription("Membre")
        .setRequired(true)
    )
    .addNumberOption(option => option
        .setName('amount')
        .setDescription('Montant')
        .setRequired(true)
    )
)
.addSubcommand(subCommand => subCommand
    .setName('set_level')
    .setDescription("Définir le niveau d'un membre")
    .addUserOption(option => option
        .setName('member')
        .setDescription("Membre")
        .setRequired(true)
    )
    .addNumberOption(option => option
        .setName('amount')
        .setDescription("Montant")
        .setRequired(true)
    )
)
.addSubcommand(subCommand => subCommand
    .setName('set_xp')
    .setDescription("Définir le montant de points XP d'un membre")
    .addUserOption(option => option
        .setName('member')
        .setDescription("Membre")
        .setRequired(true)
    )
    .addNumberOption(option => option
        .setName('amount')
        .setDescription("Montant")
        .setRequired(true)
    )
)
.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

export { adminLevelCommandBuilder }