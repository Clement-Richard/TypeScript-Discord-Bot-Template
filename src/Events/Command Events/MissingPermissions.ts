import { Message } from 'discord.js';
import { Bot } from 'src/Client/Client';
import { Command } from 'src/Interfaces/Command';
import { Run } from "../../Interfaces/Event";

export const run: Run = async(client: Bot, message: Message, command: Command) => {
    client.logger.warn(`${message.author.tag} tried to access the following admin command: ${command.properties.name}`)
    message.reply('MissingPermissions');
}

export const name: string = 'missing-permissions';