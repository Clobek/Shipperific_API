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
