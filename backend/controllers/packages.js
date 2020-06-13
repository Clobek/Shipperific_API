const express = require('express');
const router = express.Router();
// const { Schema } = require('mongoose');
// const Client = require('../models/clients.js')
const Package = require('../models/packages.js');
const unirest = require('unirest');
const jwt = require('jsonwebtoken');


// ROUTES

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


// INDEX
router.get('/', async (req, res) => {
    try {
        // const packages = await Package.find({
        //     userID: userdata.id
        // });
        const packages = await Package.find({});
        res.status(200).json(packages);
    } catch(error) {
        res.status(400).json(error)
    }
});

// CREATE
router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const createdPackage = await Package.create(req.body);
        // const createdPackage = await Package.create({userID: req.body.token});
        res.status(200).json(createdPackage);
    } catch(error) {
        res.status(400).json(error);
    }
})

// SHOW
router.get('/:id', async (req, res) => {
    try {
        const foundPackage = await Package.findById(req.params.id);
        res.status(200).json(foundPackage)
    } catch(error) {
        res.status(400).json(error);        
    }
})

// UPDATE
router.put('/:id', async (req, res) => {
    try {
        const updatedPackage = await Package.findByIdAndUpdate(
            req.params.id, 
            req.body
            );
            res.status(200).json(updatedPackage)
    } catch(error) {
        res.status(400).json(error);
    }
})

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        const deletedPackage = await Package.findByIdAndDelete(req.params.id)
        res.status(200).json(deletedPackage)
    } catch(error) {
        res.status(400).json(error);
    }
});


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

const express =         require("express");
const routes =          express.routes();
const { Schema } =      require("mongoose");
const Product =         require("../models/packages.js");
const show =            console.log;
// const unirest = require('unirest');

// ROUTES
// let req = unirest("POST", "https://order-tracking.p.rapidapi.com/trackings/realtime");
// req.headers({
// 	"x-rapidapi-host": "order-tracking.p.rapidapi.com",
// 	"x-rapidapi-key": "71db88e15amshcf09b459b324355p146d98jsn535e15d76413",
// 	"content-type": "application/json",
// 	"accept": "application/json",
// 	"useQueryString": true
// });

// req.type("json");
// req.send({
// 	"tracking_number": "1Z74A08E0317341984",
// 	"carrier_code": "ups"
// });

// req.end(function (res) {
// 	if (res.error) throw new Error(res.error);

// routes.post('/', async (req, res) => {
//     try {
//         const createdPackage = await fetch('https://order-tracking.p.rapidapi.com/trackings/realtime', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'X-RapidApi-Host' : 'order-tracking.p.rapidapi.com',
//             	'X-RapidApi-Key': '71db88e15amshcf09b459b324355p146d98jsn535e15d76413',
//             }
//             // res.status(200).json(createdPackage)
//             body: JSON.stringify(data),
//         });
//     } catch(error) {
//         res.status(400).json(error);
//     }
// })

routes.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const createdProduct = await Product.create(req.body);
    res.status(200).json(createdProduct);
  } catch (error) {
    res.status(400).json(error);
  }
});

// routes.post('/', async (req, res) => {
//     try {
//         console.log(req.body)
//         const createdProduct = await Product.create(req.body);
//         res.status(200).json(createdProduct);
//     } catch(error) {
//         res.status(400).json(error);
//     }
// })

routes.get("/", async (req, res) => {
  try {
    const Products = await Product.find({});
    res.status(200).json(Products);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = routes;