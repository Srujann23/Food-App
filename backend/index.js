const express = require('express')
const app = express()
const port = 5000
const createUserRouter = require('./Routes/CreateUser.js');
const {mongoDB} = require('./config')

mongoDB();
app.use(express.json());
app.use('/api',createUserRouter);

app.get('/', (req, res) => {
  res.send('Hello Worlds!')
})


app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});
