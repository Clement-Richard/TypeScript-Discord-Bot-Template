import { bot } from 'src/Client/Client';
import { Properties, RunClassic } from "../../../Interfaces/Command";

export const run: RunClassic = async(client, message, args) => {
    client.Stop();
}

export const properties: Properties = {
    name: 'stop-bot-admin',
    category: 'classic',
    admin: true,
    description: 'Stop Command',
    ephemeral: false,
    timeout: 0,
    options: []
};