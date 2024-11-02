import mongoose from "mongoose";

export const connetDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.log("Database Error: ", error.message)
        process.exit(1)
    }
}