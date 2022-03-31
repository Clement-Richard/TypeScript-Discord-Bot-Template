import { bot } from 'src/Client/Client';
import { Properties, RunClassic, RunSlashCommand } from "../../../Interfaces/Command";

export const runClassic: RunClassic = async(client, message, args) => {
    message.reply('Pong!');
}

export const runSlashCommand: RunSlashCommand = async(client, interaction, args) => {
    interaction.reply('Pong!');
}

export const properties: Properties = {
    name: 'ping',
    category: 'classic',
    admin: false,
    description: 'Ping Command',
    ephemeral: false,
    timeout: 0,
    options: []
};