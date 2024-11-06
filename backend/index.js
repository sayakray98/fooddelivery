const express = require('express')
const app = express()
const PORT = 8080
const connectToMongoose = require('./db')
var cors = require('cors')

connectToMongoose()

app.use(express.json());

// Enable CORS for all origins
app.use(cors())
// Routes
app.use('/auth', require('./routes/auth'));

app.listen(PORT, () => {
    console.log(`Your host http://localhost:${PORT}`)
})