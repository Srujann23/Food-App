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
        const fetched_data = mongoose.connection.db.collection("food_items");
        const food_items = await fetched_data.find({}).toArray()
        const fetched_category = mongoose.connection.db.collection("food_category");
        const foodCategory = await fetched_category.find({}).toArray();
        if (food_items.length === 0) {
            console.log("No food items found.");
        } else {
            global.food_items = food_items;
            console.log("Food items fetched:", food_items.length);
        }

        if (foodCategory.length === 0) {
            console.log("No food categories found.");
        } else {
            global.foodCategory = foodCategory;
            console.log("Food categories fetched:", foodCategory.length);
        }

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

// const mongoDB1 = async () => {
//     try {
//         mongoose.set('debug', true);
//         await mongoose.connect(MONGODB_URI);
//         // console.log(MONGODB_URI);
//         console.log("Connected to database");
//         const fetched_data = mongoose.connection.db.collection("food_items");
//         fetched_data.find({}).toArray(
//             async function (err, data) {
//                 const foodCategory = await mongoose.connection.db("foodCategory");
//                 foodCategory.find({}).toArray(function (err, catData) {

//                     if (err) console.log(err)
//                     else {
//                         global.food_items = data;
//                         global.foodCategory = catData;
//                         // console.log(global.food_items);
//                     }
//                 })
//                 if (err) console.log(err)
//                 else {
//                     global.food_items = data;
//                     // console.log(global.food_items);
//                 }
//             }
//         )


//     } catch (error) {
//         console.error("Error connecting to MongoDB:", error);
//         process.exit(1);
//     }
// };

module.exports = { mongoDB };