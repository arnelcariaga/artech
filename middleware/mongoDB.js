import mongoose from "mongoose";

const connectDB = async () => {
  // Use new db connection
  await mongoose.connect(process.env.db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default connectDB;
