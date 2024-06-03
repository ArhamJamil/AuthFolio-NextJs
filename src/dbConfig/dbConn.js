import mongoose from "mongoose";


const DBCONN = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("MongoDB Connected");
    } catch (error) {
      console.error("MongoDB connection error:", error);
      process.exit(1);
    }
  };
  
  export default DBCONN;