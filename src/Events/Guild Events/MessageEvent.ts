import { Message, Permissions } from 'discord.js';
import { Command } from 'src/Interfaces/Command';
import { Run } from "../../Interfaces/Event";

export const run: Run = async(client, message: Message) => {
    if (message.author.bot || !message.guild || !message.content.toLowerCase().startsWith('e!')) return;
    const args: string[] = message.content.slice('e!'.length).trim().split(/ +/g);
    const cmd: string | undefined = args.shift();
    const command: Command | undefined = client.getCommand(cmd!);
    if(!command){
        client.logger.warn('No command provided!');
    }
    else{
        client.logger.info(`${command.properties.name} command provided`);
        if(command.properties.admin == true && !message.member?.permissions.has([Permissions.FLAGS.ADMINISTRATOR])) return client.runEvent('missing-permissions', message, command);
        command.runClassic(client, message, args).catch((reason: any) => {
            client.logger.error(`${command.properties.name} failed!\n${reason}`);
            message.reply("Une erreur s'est produite");
        })
    }
}

export const name: string = 'messageCreate';