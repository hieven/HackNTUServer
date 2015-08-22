import mongoose from 'mongoose';
import config   from '../config/local';


// Schemas
import moodSchema     from './mood';
import userSchema     from './user';



// Models
export const Mood = mongoose.model('mood', moodSchema(mongoose));
export const User = mongoose.model('user', userSchema(mongoose));




const database = config.mongo.database;
const host     = config.mongo.host;

// Connection
mongoose.connect('mongodb://' + host + '/' + database);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));