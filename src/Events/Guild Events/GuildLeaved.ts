import { Guild } from 'discord.js';
import { Bot } from 'src/Client/Client';
import { SettingsMongoose } from '../../Database/Classes/Settings';
import { Run } from "../../Interfaces/Event";

export const run: Run = async(client: Bot, guild: Guild) => {
   client.logger.success(`Successfully leaved ${guild.name}`);
   // Décommentez si usage de mongoDB
   // SettingsMongoose.deleteSettings(guild.id);
}

export const name: string = 'guildDelete';