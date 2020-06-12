const express = require('express');
const router = express.Router();
const { Schema } = require('mongoose');
const Package = require('../models/packages.js');
const unirest = require('unirest');

router.get('/api/:id/:carrier_code', (req, res) => {
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

router.get('/index', async (req, res) => {
    res.json(await Package.find({}))
})

router.post('/create', async (req, res) => {
    res.json(await Package.create(req.body)) 
})

router.get('/show/:id', async (req, res) => {
    res.json(await Package.findById(req.params.id))
})

router.put('/update/:id', async (req, res) => {
    res.json(await Package.findByIdAndUpdate(req.params.id, req.body))
})

router.delete('/delete/:id', async (req, res) => {
    res.json(await Package.findByIdAndDelete(req.params.id))
})

// LOGIN 
router.post('/login', async (req, res) => {
    const {username, password} = req.body;
    if(username === user.username && password === user.password) {
        const token = jwt.sign({username}, 'secret');
        res.status(200).json(token);
    } else {
        res.status(400).send('Wrong Username or Password')
    }
})

// packages.post('/', async (req, res) => {
//     try {
//       console.log(req.body);
//       const createdPackage = await Package.create(req.body);
//       res.status(200).json(createdPackage);
//     } catch (error) {
//       res.status(400).json(error);
//     }
//   });

// // packages.get('/', async (req, res) => {
// //     try {
// //       const foundPackages = await Package.find({});
// //       res.status(200).json(foundPackages);
// //     } catch (error) {
// //       res.status(400).json(error);
// //     }
// //   });
  

  module.exports = router;