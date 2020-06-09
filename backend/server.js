// DEPENDENCIES

require('custom-env').env(true);
const express = require('express');
const app = express();
const mongoose = require('mongoose');
// const cors = require('cors')
const db = mongoose.connection;
const dbConfig = {useNewUrlParser: true, useUnifiedTopology: true}
const PORT = process.env.PORT || 3000;

// CONNECT TO DATABASE
mongoose.connect(process.env.MONGODB_URI, dbConfig)
db.on('open', () => {
    console.log('connected to mongo')
})
db.on('error', (err) => {
    console.log(err);
})

// MIDDLEWARE
app.use(express.json())

// SERVER LISTENER
app.listen(PORT, ()=> {
    console.log(`Listening on port ${PORT}`)
})