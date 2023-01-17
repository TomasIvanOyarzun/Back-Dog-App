import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

export const mongooseConnect = async () => {
     try {
         mongoose.set("strictQuery", false);
        const db = await mongoose.connect(`${process.env.DB_URL}`)
        console.log('databse is connected to', db.connection.db.databaseName)
     } catch (error) {
        console.log(error)
        process.exit(1)
     }
}