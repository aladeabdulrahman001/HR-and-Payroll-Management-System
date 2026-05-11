import mongoose from 'mongoose';
import { DB_URI } from './env.js';

if (!DB_URI) {
    throw new Error('Database URI is not defined');
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('Error connecting to MongoDB: ', error);
    process.exit(1);
  }
}

export default connectToDatabase;