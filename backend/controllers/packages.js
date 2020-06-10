const express = require('express');
const router = express.Router();
const Package = require('../models/packages.js');
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

// router.post('/', async (req, res) => {
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

router.post('/', async (req, res) => {
    try {
        console.log(req.body)
        const createdPackage = await Package.create(req.body);
        res.status(200).json(createdPackage);
    } catch(error) {
        res.status(400).json(error);
    }
})


// router.post('/', async (req, res) => {
//     try {
//         console.log(req.body)
//         const createdPackage = await Package.create(req.body);
//         res.status(200).json(createdPackage);
//     } catch(error) {
//         res.status(400).json(error);
//     }
// })

router.get('/', async (req, res) => {
    try {
        const packages = await Package.find({});
        res.status(200).json(packages);
    } catch(error) {
        res.status(400).json(error)
    }
})

module.exports = router;