const express = require('express')
const app = express()
const port = 5000
const createUserRouter = require('./Routes/CreateUser.js');
const LoginUserRouter = require('./Routes/LoginUser.js');
const DisplayData = require('./Routes/DisplayData.js');
const OrderData = require('./Routes/OrderData.js');
const { mongoDB } = require('./config')
// const { cors } = require('cors');


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );

  // If it's a preflight request, respond with 204 No Content
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});


const startServer = async () => {
  await mongoDB();

  if (global.food_items && global.foodCategory) {
      console.log("Global food items and categories are populated");
  } else {
      console.error("Failed to populate global food items or categories");
      // process.exit(1); 
  }
}
app.use(express.json());
app.use('/api', createUserRouter);
app.use('/api', LoginUserRouter);
app.use('/api', DisplayData);
app.use('/api', OrderData);

app.get('/', (req, res) => {
  res.send('Server Running....!')
})


app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});

startServer();