import mongoose, { mongo } from "mongoose";
let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("MongoDB already connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
    });
  } catch (error) {
    console.log(error, "MongoDB connection error");
  }
};
