const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors') 
connectToMongo();
const app = express()
const port = 5000
app.use(cors())
app.use(express.json())
// Available Routes
app.use('/api/login', require('./routes/login'))
app.use('/api/images', require('./routes/images'))
// app.use('/api/notes', require('./routes/notes'))
app.listen(port, () => {
  console.log(`app1 backend listening at http://localhost:${port}`)
})