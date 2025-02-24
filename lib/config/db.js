import mongoose from "mongoose";

// export const ConnectDB = async () => {
//     await mongoose.connect('mongodb+srv://piyushbhagchandani64:08P5NdHDb5F2CHc4@cluster99.57yjjst.mongodb.net/blog-app?retryWrites=true&w=majority', {
//     serverSelectionTimeoutMS: 30000,
//     })
//     console.log("DB Connected!");
// }


export const ConnectDB = async () => {
    if (mongoose.connection.readyState === 0) { // 0 = disconnected
      try {
        await mongoose.connect('mongodb+srv://piyushbhagchandani64:08P5NdHDb5F2CHc4@cluster99.57yjjst.mongodb.net/blog-app?retryWrites=true&w=majority&appName=Cluster99', {
          serverSelectionTimeoutMS: 60000 // 30 seconds timeout for initial connection
        });
        console.log("✅ MongoDB Connected");
      } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        throw error;
      }
    }
  };