import mongoose from 'mongoose';
import { bot } from '../Client/Client';
import { config } from '../config'

class MongooseConnect{
    public static init() {
        mongoose.connect(`mongodb+srv://${config.dbUsername}:${config.dbPassword}@cluster0.1uij2.mongodb.net/${config.dbName}?retryWrites=true&w=majority`);
    
        mongoose.connection.on('connected', () => {
            bot.logger.success(`Successfully connected to MongoDB`);
        })
    
        mongoose.connection.on('err', (err) => {
            bot.logger.error(`Connection Error : \n ${err}`);
        })
    
        mongoose.connection.on('disconnected', () => {
            bot.logger.log(`Disconnected from MongoDB`);
        })
    }
}

export { MongooseConnect }
