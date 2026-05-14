import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config({
  path: '.env.development.local',
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);

    console.log('Database connected successfully');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;