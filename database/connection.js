import mongoose from 'mongoose';

const connectDB = () => {
  try {
    mongoose.connect(
      process.env.MONGO_URI,
      {
        dbName: 'QuestSite',
      },
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(`Database connected`);
  } catch (error) {
    console.log(`DB connection failed: ${error.message}`);
  }
};

export default connectDB;
