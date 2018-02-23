/* eslint no-console: 0 */
import mongoose from 'mongoose';
import { config } from '../config';

mongoose.connect(config.mongoConnectStr);
const db = mongoose.connection;

db.once('open', () => console.log('Successfully connected to MongoDB'));
db.on('error', () => console.error('Error with MongoDB'));

process.once('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log(
      'Mongoose default connection disconnected through app termination',
    );
    process.exit(0);
  });
});
