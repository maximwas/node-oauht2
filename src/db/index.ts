import mongoose from 'mongoose';

const uri = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.4vbcjik.mongodb.net/Authorization`;

export async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log('You successfully connected to MongoDB!');
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.disconnect();
  }
}
