const express = require('express')
const app = express()
const port = 5000
const createUserRouter = require('./Routes/CreateUser.js');
const LoginUserRouter = require('./Routes/LoginUser.js');
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


mongoDB();
app.use(express.json());
app.use('/api', createUserRouter);
app.use('/api', LoginUserRouter);

app.get('/', (req, res) => {
  res.send('Hello Worlds!')
})


app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});
