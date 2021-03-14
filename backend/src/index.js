const express = require('express')
const cors = require('cors')
const handleErrors = require('./middleware/handleErrors');

const router = require('./routes')

const app = express()

// Accept JSON by adding JSON middleware
app.use(express.json())

// Allow access from UI app
app.use(cors())

app.use('/', router)

// Add error handling middleware
app.use(handleErrors);

app.listen(5000, () => console.log('NPS backend started!'))