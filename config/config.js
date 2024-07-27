import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("\x1b[35m%s\x1b[0m", "dataBase Connected!");
  } catch (error) {
    console.log(error);
  }
};
