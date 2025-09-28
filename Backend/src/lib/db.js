import mongoose from "mongoose";


const connectDB = async () => {

    try {
        
        const conn = await mongoose.connect(process.env.MONGO_DB_URI)
        console.log(`MongoDb connected ${conn.connection.host}`);
        
    } catch (error) {

        console.log("Error in Connecting db", error)
                
    }
}

export default connectDB