import mongoose from 'mongoose';
import { config } from '../config';

mongoose.connect(config.mongoConnectStr);
const db = mongoose.connection;

db.on('error', () => console.error('Error with MongoDB'));
db.once('open', () => console.log('Successfully connected to MongoDB'));
