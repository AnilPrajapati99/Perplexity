import mongoose from "mongoose";

export async function connectTodb() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connect To db");
  } catch (error) {
    console.log("error", error.message);
  }
}
