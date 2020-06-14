const express = require('express');
const router = express.Router();
const Package = require('../models/packages.js');
const jwt = require('jsonwebtoken')


// ROUTES

const auth = async (req, res, next) => {
    try {
    const {authorization} = req.headers;
    if (authorization) {
        await console.log(token)
            const token = authorization.split(' ')[1];
            const result = jwt.verify(token, SECRET)
            req.user = result;
            next();
    } else {
            res.send('NO TOKEN')
    }}
    catch(error) {
      res.send(error)
    }
  }

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
router.post('/', auth, async (req, res) => {
    try {
        // const createdPackage = await Package.create({item: req.body.item, tracking_number: req.body.tracking_number, carrier_code: req.body.carrier, userID: req.user});
        // res.status(200).json(createdPackage);
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