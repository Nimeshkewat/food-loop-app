import mongoose from "mongoose";

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Db Connected");
  } catch (error) {
    console.log(`DB Error: ${error}`);
    throw error;
  }
};

export default connectDB;
