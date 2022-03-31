require("dotenv").config();
import { IConfig } from "./Interfaces/Config"

// Config
class Config implements IConfig {
    private _token: string | undefined;
    private _dbPassword: string | undefined;
    private _dbUsername: string | undefined;
    private _dbName: string | undefined;

    public get dbUsername(): string | undefined {
        return this._dbUsername;
    }
    public set dbUsername(value: string | undefined) {
        this._dbUsername = value;
    }

    public get dbPassword(): string | undefined {
        return this._dbPassword;
    }
    public set dbPassword(value: string | undefined) {
        this._dbPassword = value;
    }

    public get token(): string | undefined {
        return this._token;
    }
    public set token(value: string | undefined) {
        this._token = value;
    }

    public get dbName(): string | undefined {
        return this._dbName;
    }
    public set dbName(value: string | undefined) {
        this._dbName = value;
    }
};

const config = new Config()
config.token = process.env.BOTTOKEN;
config.dbUsername = process.env.MongoDBUsername;
config.dbPassword =process.env.MongoDBPassword;
config.dbName = process.env.MongoDBName

export { config };
