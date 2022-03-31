import { CommandInteraction } from 'discord.js';
import { Command } from 'src/Interfaces/Command';
import { Run } from "../../Interfaces/Event";

export const run: Run = async(client, interaction: CommandInteraction) => {
    if (!interaction.isCommand()) return;
    const options = interaction.options;
    const args = options.data.map(option => {
        return option.value;
    });
    client.logger.info(`${interaction.commandName} command provided`);
    const command: Command | undefined = client.getCommand(interaction.commandName!);
    if(!command){
        client.logger.warn('No command provided!');
    }
    else{
        client.logger.info(`${interaction.commandName} command provided`);
        command.runSlashCommand(client, interaction, args).catch((reason: any) => {
            client.logger.error(`${command.properties.name} failed!\n${reason}`);
            interaction.reply("Une erreur s'est produite");
        })
    }
}

export const name: string = 'interactionCreate';