require('custom-env').env(true);
const express = require('express')
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
const PORT = process.env.PORT
const Package = require('./models/packages.js')
const unirest = require("unirest");
const KEY = process.env.KEY
const jwt = require('jsonwebtoken')
const packageController = require('./controllers/packages.js');
const SECRET = process.env.SECRET
// const initMap = require('./maps.js')
// const Index = require('./index')


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

// DUMMY USER
const user = {username: 'bryce', password: 'ship'}

// AUTHENTICATE ROUTE

// const token = jwt.sign({cheese: 'gouda'}, SECRET);
// console.log(token)
// const decoded = jwt.verify(token, SECRET);
// console.log(decoded)

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
})






//     try {
  //         const token = authorization.split(' ')[1]; // takes token from header
  //         const result = jwt.verify(token, SECRET)
  //         req.user = result;
  //         console.log(req.user)
  //         // const payload = jwt.verify(token, SECRET);
  //         // req.user = payload; // adds user data into request
  //         next(); // goes to next route
  //     } catch(error) {
  //         res.status(400).json(error)
  //     }
  // } else {
  //     res.status(400).send('No Authorization header')
  // }
// }

const approvedList = ['http://localhost:1985'];
const corsOptions = {
    origin: function (origin, callback) {
        if (approvedList.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};



// MAP
// GOOGLE MAPS - Maps JavaScript API. Source: https://developers.google.com/maps/documentation/javascript/geocoding
var map;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
    // Style source: https://developers.google.com/maps/documentation/javascript/styling#style-example
    styles: [
      {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{color: '#263c3f'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{color: '#6b9a76'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{color: '#38414e'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{color: '#212a37'}]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{color: '#9ca5b3'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{color: '#746855'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{color: '#1f2835'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{color: '#f3d19c'}]
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{color: '#2f3948'}]
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{color: '#17263c'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{color: '#515c6d'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{color: '#17263c'}]
      }
    ]
  }); 
  var script = document.createElement('script');
  script.src = 'http:';
  document.getElementsByTagName('head')[0].appendChild(script);
  var marker = new google.maps.Marker({map: map, position: { lat: -34.397, lng: 150.644 }});
}


// var geocoder;
//   var map;
//   function initialize() {
//     geocoder = new google.maps.Geocoder();
//     var mapOptions = {
//       zoom: 12,
//       styles: [
//         {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
//         {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
//         {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
//         {
//           featureType: 'administrative.locality',
//           elementType: 'labels.text.fill',
//           stylers: [{color: '#d59563'}]
//         },
//         {
//           featureType: 'poi',
//           elementType: 'labels.text.fill',
//           stylers: [{color: '#d59563'}]
//         },
//         {
//           featureType: 'poi.park',
//           elementType: 'geometry',
//           stylers: [{color: '#263c3f'}]
//         },
//         {
//           featureType: 'poi.park',
//           elementType: 'labels.text.fill',
//           stylers: [{color: '#6b9a76'}]
//         },
//         {
//           featureType: 'road',
//           elementType: 'geometry',
//           stylers: [{color: '#38414e'}]
//         },
//         {
//           featureType: 'road',
//           elementType: 'geometry.stroke',
//           stylers: [{color: '#212a37'}]
//         },
//         {
//           featureType: 'road',
//           elementType: 'labels.text.fill',
//           stylers: [{color: '#9ca5b3'}]
//         },
//         {
//           featureType: 'road.highway',
//           elementType: 'geometry',
//           stylers: [{color: '#746855'}]
//         },
//         {
//           featureType: 'road.highway',
//           elementType: 'geometry.stroke',
//           stylers: [{color: '#1f2835'}]
//         },
//         {
//           featureType: 'road.highway',
//           elementType: 'labels.text.fill',
//           stylers: [{color: '#f3d19c'}]
//         },
//         {
//           featureType: 'transit',
//           elementType: 'geometry',
//           stylers: [{color: '#2f3948'}]
//         },
//         {
//           featureType: 'transit.station',
//           elementType: 'labels.text.fill',
//           stylers: [{color: '#d59563'}]
//         },
//         {
//           featureType: 'water',
//           elementType: 'geometry',
//           stylers: [{color: '#17263c'}]
//         },
//         {
//           featureType: 'water',
//           elementType: 'labels.text.fill',
//           stylers: [{color: '#515c6d'}]
//         },
//         {
//           featureType: 'water',
//           elementType: 'labels.text.stroke',
//           stylers: [{color: '#17263c'}]
//         }
//       ]
//     }
//     map = new google.maps.Map(document.getElementById('map'), mapOptions);
//   }

//   function codeAddress() {
//     var address = document.getElementById('address').value;
//     geocoder.geocode( { 'address': address}, function(results, status) {
//       if (status == 'OK') {
//         map.setCenter(results[0].geometry.location);
//         var marker = new google.maps.Marker({
//             map: map,
//             position: results[0].geometry.location
//         });
//       } else {
//         alert('Geocode was not successful for the following reason: ' + status);
//       }
//     });
//   }

//   initialize();



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
        // res.send(`<div>
        // <h1>Package</h1>
        // <p>Id: ${apiResponse.items[0].id}<br />
        // Tracking number:${apiResponse.items[0].tracking_number}<br />
        // Carrier Code: ${apiResponse.items[0].carrier_code}<br />
        // Time received: ${apiResponse.items[0].origin_info.trackinfo[1].Date}<br />
        // Origin Desination: ${apiResponse.items[0].origin_info.trackinfo[1].Details} <br />
        // Arrival Destination: ${apiResponse.items[0].origin_info.trackinfo[0].Details} <br />
        // Status: ${apiResponse.items[0].origin_info.trackinfo[0].StatusDescription} <br />
        // </p>
        // </div>`)
        res.send(apiResponse) 
    });
})


// Distance Matrix API
// https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${apiResponse.items[0].origin_info.trackinfo[1].Details}&destinations=${apiResponse.items[0].origin_info.trackinfo[0].Details}&key=AIzaSyCy8_EIOMhVVsD2eGHH5Rjy5DicXvNBzbs

// Geocoding API
// https://maps.googleapis.com/maps/api/geocode/json?address=Wilmington,+DE&key=AIzaSyCy8_EIOMhVVsD2eGHH5Rjy5DicXvNBzbs



// app.get('/index', async (req, res) => {
//     res.json(await Package.find({}))
// })

// app.post('/create', async (req, res) => {
//     res.json(await Package.create(req.body)) 
// })

// app.get('/show/:id', async (req, res) => {
//     res.json(await Package.findById(req.params.id))
// })

// app.put('/update/:id', async (req, res) => {
//     res.json(await Package.findByIdAndUpdate(req.params.id, req.body))
// })

// app.delete('/delete/:id', async (req, res) => {
//     res.json(await Package.findByIdAndDelete(req.params.id))
// })


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})