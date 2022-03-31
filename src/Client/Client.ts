// Imports
import { Client, Collection, CommandInteraction, Intents, Message } from "discord.js";
import consola, { Consola } from "consola";
import { config } from '../config';
import glob from 'glob';
import { promisify } from "util";
import { Command } from "../Interfaces/Command";
import { Event } from "../Interfaces/Event";
import { Routes } from 'discord-api-types/v9'
import { REST } from "@discordjs/rest";
import cliProgress from 'cli-progress';

const globPromise = promisify(glob);
const token = config.token;

// Bot
class Bot extends Client {
    private restRequest = new REST({ version: '9' }).setToken(process.env.BOTTOKEN!);
    public logger: Consola = consola;
    public started: boolean = false;
    public commands: Collection<string, Command> = new Collection();
    public events: Collection<string, Event> = new Collection();

     /**
     * constructor
     */
    constructor() {
        super({intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_WEBHOOKS]});
    }

     /**
     * Start
     */
    public async Start(): Promise<void> {
        if(this.started == false) {
            this.logger.success(`Bot started`)
            this.login(token);
            this.started = true;
            const commandFiles: string[] = await globPromise(`${__dirname}/../Commands/**/*{.ts,.js}`);
            const eventsFiles: string[] = await globPromise(`${__dirname}/../Events/**/*{.ts,.js}`);
            const loadingBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
            this.logger.info('Mapping events and commands...');
            loadingBar.start(eventsFiles.length+commandFiles.length, 0);
            commandFiles.map(async(value: string) => {
                const file: Command = await import(value);
                this.commands.set(file.properties.name, file);
                loadingBar.increment(1);
            })

            eventsFiles.map(async(value: string) => {
                const event: Event = await import(value);
                this.events.set(event.name, event);
                this.on(event.name, event.run.bind(null, this));
                loadingBar.increment(1);
            })
        }
        else {
            this.logger.error(`The bot is already running..`);
        }
    }

     /**
     * Stop
     */
    public Stop(): void {
        if(this.started == true){
            this.logger.success(`Bot stopped`)
            this.started = false;
            this.destroy();
        }
        else{
            this.logger.error(`Nothing is running..`)
        }
    }

     /**
     * getIdentifier
     */
    public getIdentifier(): string | undefined {
        return this.user?.id
    }

     /**
     * getAvatarURL
     */
    public getAvatarURL(): string | null | undefined {
        return this.user?.avatarURL();
    }

     /**
     * getDiscriminator
     */
    public getDiscriminator(): string | undefined {
        return this.user?.discriminator;
    }

     /**
     * getUsername
     */
    public getUsername(): string | undefined {
        return this.user?.username;
    }

     /**
     * getTag
     */
    public getTag(): string | undefined {
        return this.user?.tag;
    }

     /**
     * isVerified
     */
    public isVerified(): boolean | undefined {
        return this.user?.verified;
    }

    /**
     * getCommands
     */
    public getCommands(): Collection<string, Command> {
        return this.commands;
    }

    /**
     * getEvents
     */
    public getEvents(): Collection<string, Event> {
        return this.events;
    }

    /**
     * getCommand
     */
    public getCommand(commandName: string): Command | undefined {
        return this.commands.get(commandName);
    }

    /**
     * runCommand
     */
    public runCommand(commandName: string, message: Message, args: any[]): void {
        this.commands.get(commandName)?.runClassic(this, message, args);
    }

    /**
     * runSlashCommand
     */
     public runSlashCommand(commandName: string, interaction: CommandInteraction, args: any[]): void {
        this.commands.get(commandName)?.runSlashCommand(this, interaction, args);
    }

    /**
     * getEvent
     */
    public getEvent(eventName: string): Event | undefined {
        return this.events.get(eventName);
    }

    /**
     * runEvent
     */
    public runEvent(eventName: string, ...args: any): void {
        this.events.get(eventName)?.run(this, args);
    }

   /**
    * deploySlashCommands
    */
   public async deploySlashCommands() {
    try {
		this.logger.info('Started refreshing application (/) commands.');

		await this.restRequest.put(
			Routes.applicationCommands(this.getIdentifier()!),
			{ 
                body: this.commands.map(command => {
                    return command.properties
                }) 
            },
		);

		this.logger.success('Successfully reloaded application (/) commands.');
	} catch (error) {
		this.logger.error(error);
	}
   }
}

const bot = new Bot();

// Exports
export { Bot, bot };