const express = require('express')
const app = express()
const port = 5000

const {mongoDB} = require('./config')

mongoDB();

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})