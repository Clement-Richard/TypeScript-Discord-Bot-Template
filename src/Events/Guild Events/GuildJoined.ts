import { Guild } from 'discord.js';
import { Bot } from 'src/Client/Client';
import { SettingsMongoose } from '../../Database/Classes/Settings';
import { Run } from "../../Interfaces/Event";

export const run: Run = async(client: Bot, guild: Guild) => {
   client.logger.success(`Successfully joined ${guild.name}`);
   // Décommentez si usage de mongoDB
   // new SettingsMongoose(guild.id).createEntiy();
}

export const name: string = 'guildCreate';