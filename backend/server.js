require('custom-env').env(true);
const express = require('express')
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
const PORT = process.env.PORT
const Package = require('./models/packages.js')
const User = require('./models/users.js')
const unirest = require("unirest");
const KEY = process.env.KEY
const jwt = require('jsonwebtoken')
const packageController = require('./controllers/packages.js');
const SECRET = process.env.SECRET
const bcrypt = require('bcrypt')


// MONGO DATABASE
const db = mongoose.connection;
const dbConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
}

mongoose.connect(process.env.MONGODB_URI, dbConfig)

db.on('open', () => {
    console.log('connected to mongo')
})

db.on('error', (err) => {
    console.log(err)
})

//MIDDLEWARE
app.use(cors());
app.use(express.json())
app.use('/packages/', packageController);

// From Alex Merced's AM Coder - JWT Authentication/ExpressJS - Backend & Frontend. Source: https://www.youtube.com/watch?v=qVe9RpLLEWg

// DUMMY USER
const user = {username: 'bryce', password: 'ship'}

app.post('/signup', (req, res)=>{
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  User.create(req.body, (error, createdUser)=>{
  })
})

// LOGIN 
app.post('/login', async (req, res) => {
  const {username, password} = req.body;
  if(username === user.username && password === user.password) {
      const token = await jwt.sign({username}, SECRET);
      await res.status(200).json(token);
  } else {
      res.status(400).send('Wrong Username or Password')
  }
})

// AUTHORIZATION MIDDLEWARE
const auth = async (req, res, next) => {
  try {
  const {authorization} = req.headers;
  // "bearer a452348956y0"
  // check if there's a header
  if (authorization) {
    // console.log(authorization)
          const token = authorization.split(' ')[1]; // takes token from header
          const result = jwt.verify(token, SECRET)
          req.user = result;
          // console.log(req.user)
          next();
  } else {
          res.send('NO TOKEN')
  }}
  catch(error) {
    res.send(error)
  }
}

// TEST ROUTE
app.get('/test', auth, (req, res) => {
  res.send(req.user)
  console.log(req.user.username)
})

// ROUTES

app.get('/api/:id/:carrier_code', (req, res) => {
    const apiReq = unirest("POST", "https://order-tracking.p.rapidapi.com/trackings/realtime");
        apiReq.headers({
        "x-rapidapi-host": "order-tracking.p.rapidapi.com",
        "x-rapidapi-key": "71db88e15amshcf09b459b324355p146d98jsn535e15d76413",
        "content-type": "application/json",
        "accept": "application/json",
        "useQueryString": true
    });
    apiReq.type("json");
    apiReq.send({
        "tracking_number": req.params.id,
        "carrier_code": req.params.carrier_code
    });
    let apiResponse
    apiReq.end(function (response) {
        if (response.error) throw new Error(response.error);
        apiResponse = response.body.data;
        res.send(apiResponse) 
    });
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
