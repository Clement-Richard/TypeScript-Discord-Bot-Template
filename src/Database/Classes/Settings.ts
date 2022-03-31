import { SettingsModel } from "../Models/SettingsModel";

class SettingsMongoose {
    private _prefix: string | undefined;
    private _guildId: string | undefined;
    private _id: string | undefined;

    constructor( guildId: string, prefix?: string){
        this._guildId = guildId;
        if(!this._prefix) this.prefix = 'e!';
        else this._prefix = prefix;
    }

    public get id(): string | undefined {
        return this._id;
    }
    
    public set id(value: string | undefined) {
        this._id = value;
    }

    public get prefix(): string | undefined {
        return this._prefix;
    }

    public set prefix(value: string | undefined) {
        this._prefix = value;
    }

    
    public get guildId(): string | undefined {
        return this._guildId;
    }

    public set guildId(value: string | undefined) {
        this._guildId = value;
    }

    /**
     * saveEntity
     */
    public async saveEntity(): Promise<SettingsMongoose | null> {
        var found: SettingsMongoose | null = await SettingsModel.findOneAndUpdate({guildId: this._guildId}, 
        {
            $set: {
                prefix: this.prefix
            }
        })
        return found;
    }

    /**
     * updateEntity
     */
     public static async updateEntity(settings: SettingsMongoose): Promise<void> {
        await SettingsModel.findOneAndUpdate({guildId: settings.guildId}, 
        {
            $set: {
                prefix: settings.prefix,
            }
        });
    }

     /**
     * deleteSettings
     */
    public static async deleteSettings(guildId: string): Promise<void> {
        await SettingsModel.findOneAndRemove({guildId: guildId});
    }

    /**
     * getSettings
     */
    public static async getSettings(guildId: string): Promise<SettingsMongoose | null> {
        var found: SettingsMongoose | null = await SettingsModel.findOne({guildId: guildId});
        return found;
    }

    /**
     * createEntiy
     */
    public async createEntiy(): Promise<void> {
        const doc = new SettingsModel({
            guildId: this._guildId,
            prefix: this._prefix,
        });
        await doc.save();
        console.log(doc.toJSON());
    }
}

export { SettingsMongoose };