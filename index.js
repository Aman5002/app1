const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors') 
connectToMongo();
const app = express()
const port = 5000
app.use(cors())
app.use(express.json())

var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: false,
}))

// Available Routes
app.use('/api/login', require('./routes/login'))
app.use('/api/images', require('./routes/images'))
// app.use('/api/notes', require('./routes/notes'))
app.listen(port)