import mongoose from "mongoose";
import { dbConfig } from "./config/db-config";

/**
 * connect db
 */
const DB_URL = `mongodb://${dbConfig.DB_HOST}:${dbConfig.DB_PORT}/${dbConfig.DB}`;
console.log(DB_URL);
const connectDb = async () => {
	try {
		await mongoose.connect(DB_URL);
		console.log("DATABASE CONNECTED!");
	} catch (error) {
		console.log("Database error", error);
	}
};

export { connectDb };
