const dotenv =require( 'dotenv');
const  path =require('path');
const  fileURLToPath =require('url');
const mongoose = require('mongoose');

dotenv.config({ path: path.resolve(__dirname, '../.env') });


const MONGODB_URI=process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error("Error: MONGODB_URI is not defined in .env file");
    process.exit(1);
}


const mongoDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to database");
    } catch (error) {
        console.error("Error connecting to the database", error);
        process.exit(1);
    }
};

module.exports = { mongoDB };