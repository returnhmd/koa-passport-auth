import mongoose from 'mongoose';
import { config } from './config';

mongoose.connect(config.mongoConnectStr);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Сonnection error:'));
db.once('open', () => console.log('Connected to MongoDB'));
