const dotenv = require('dotenv');
const path = require('path');
// const fileURLToPath = require('url');
const mongoose = require('mongoose');

dotenv.config({ path: path.resolve(__dirname, '../.env') });


const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error("Error: MONGODB_URI is not defined in .env file");
    process.exit(1);
}


const mongoDB = async () => {
    try {
        mongoose.set('debug', true);
        await mongoose.connect(MONGODB_URI);
        // console.log(MONGODB_URI);
        console.log("Connected to database");
         const db = mongoose.connection.db;
        const fetched_data = await db.collection("food_items");
        // console.log(fetched_data);
        // console.log("Collection Name:", fetched_data.collectionName);
        const data = await fetched_data.find({}).toArray();
        if (data.length === 0) {
            console.log("No data found.");
          } else {
            // console.log(data);
          }
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

/*
const mongoDB = async () => {
    await mongoose.connect(MONGODB_URI);
console.log('Connected');
const foodItems = mongoose.connection.collection('food_items')
try {
    const data = await foodItems.find({}).toArray();
    console.log(data);
} catch (error) {
    console.error(error);
}
    };
*/
module.exports = { mongoDB };