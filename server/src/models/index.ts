import mongoose from "mongoose";
import config from "../config/config";

async function main () {
  try {
    console.log('Database connection log 😍');
    await mongoose.connect(`${config.dbUrl}`);
    console.log('Database successfully connected to server 🚀');
  } catch (error) {
    console.log('🔥 Error in the database connection.');
  }
};
main();

export default mongoose;