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
        res.send(apiResponse) 
    });
})

// INDEX
router.get('/', async (req, res) => {
    try {
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

module.exports = router;