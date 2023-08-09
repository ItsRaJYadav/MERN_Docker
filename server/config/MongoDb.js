import mongoose from 'mongoose';



const connectDB = async () => {
  try {
    const Conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });

    console.log(`Mongodb DataBase Connected! ${Conn.connection.host}`);
  } catch (error) {
    console.log(`error: ${error}`);
  }
};

export default connectDB;
