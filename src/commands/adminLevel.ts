import { ChatInputCommandInteraction } from 'discord.js'
import {
    executeLevelGiveLevelSlashCommand,
    executeLevelGiveXpSlashCommand,
    executeLevelRemoveLevelSlashCommand,
    executeLevelRemoveXpSlashCommand,
    executeLevelSetLevelSlashCommand,
    executeLevelSetXpSlashCommand
} from './adminLevelSubcommands'

export async function executeAdminLevelSlashCommand(interaction: ChatInputCommandInteraction) {

    const subCommand = interaction.options.getSubcommand()

    if(subCommand == 'give_level') {
        await executeLevelGiveLevelSlashCommand(interaction)
    }

    if(subCommand == 'give_xp') {
        await executeLevelGiveXpSlashCommand(interaction)
    }

    if(subCommand == 'remove_level') {
        await executeLevelRemoveLevelSlashCommand(interaction)
    }

    if(subCommand == 'remove_xp') {
        await executeLevelRemoveXpSlashCommand(interaction)
    }

    if(subCommand == 'set_level') {
        await executeLevelSetLevelSlashCommand(interaction)
    }

    if(subCommand == 'set_xp') {
        await executeLevelSetXpSlashCommand(interaction)
    }

}