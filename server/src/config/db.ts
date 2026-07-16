import mongoose from "mongoose";

const connectDB = () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined");
  }

  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Db Connected");
    })
    .catch((err) => {
      console.log(`DB Error: ${err}`);
    });
};

export default connectDB;
