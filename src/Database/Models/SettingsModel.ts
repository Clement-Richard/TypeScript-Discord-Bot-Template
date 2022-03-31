import { Schema, model } from 'mongoose';
import { ISettings } from '../Interfaces/ISettings';

const SettingsSchema = new Schema<ISettings>({
    guildId: { type: String, required: true},
    prefix: { type: String, required: false, default: 'e!' },
});

const SettingsModel = model<ISettings>('Settings', SettingsSchema, 'settings');

export { SettingsModel };
