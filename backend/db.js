import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: "config/config.env" });

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then(() => {
      console.log("Mongodb Database Connected");
    })
    .catch((e) => {
      console.log(e);
    });
};

export default connectDatabase;
