const express = require('express');
const router = express.Router();
const Package = require('../models/packages.js');
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET


// ROUTES

const auth = async (req, res, next) => {
    console.log('Auth')
    try {
    const {authorization} = req.headers;
    if (authorization) {
            const token = authorization.split(' ')[1];
            const result = jwt.verify(token, SECRET)
            req.user = result;
            console.log('Verified')
            next();
    } else {
            res.send('NO TOKEN')
    }}
    catch(error) {
      res.send(error)
    }
  }

//Show\\
router.get('/', auth, async (req, res) => {
    try {
        console.log('Get Route')
        const packages = await Package.find({userID: req.user.username});
        console.log('Found Packages')
        res.status(200).json(packages);
    } catch(error) {
        res.status(400).json(error)
    }
});

// CREATE
router.post('/', auth, async (req, res) => {
    try {
        Package.create({item: req.body.item, tracking_number: req.body.tracking_number, carrier_code: req.body.carrier, userID: req.user.username});
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
router.delete('/:id', auth, async (req, res) => {
    try {
        await Package.findByIdAndDelete(req.params.id)
    } catch(error) {
        res.status(400).json(error);
    }
});

module.exports = router;