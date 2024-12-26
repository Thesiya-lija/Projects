import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }
    await mongoose.connect(uri);
    const connection = mongoose.connection;
    connection.on('connected', () => {
      console.log('Connected to MongoDB');
    });
    connection.on('error', (error) => {
      console.error('MongoDB connection error:', error);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default connectDB;
