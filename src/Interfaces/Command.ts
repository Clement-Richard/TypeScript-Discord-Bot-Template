import { Bot } from "../Client/Client"
import { CommandInteraction, Message } from "discord.js"

export interface RunClassic {
    (client: Bot, message: Message, args: any[]): Promise<void>;
}

export interface RunSlashCommand {
    (client: Bot, interaction: CommandInteraction, args: any[]): Promise<void>;
}

export interface Options {
    name: string;
    type: number;
    description: string;
    required: boolean;
}

export interface Properties {
    name: string;
    category: string;
    admin: boolean;
    description: string;
    ephemeral: boolean;
    timeout: number;
    options: Options[];
}

export interface Command {
    properties: Properties;
    runClassic: RunClassic;
    runSlashCommand: RunSlashCommand;
}
