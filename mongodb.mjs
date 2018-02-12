import mongoose from 'mongoose';
import { mongooseConnect } from './config.mjs';

mongoose.connect(mongooseConnect);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Сonnection error:'));
db.once('open', () => console.log('Connected to MongoDB'));
