const express = require('express');
const router = express.Router();
const Package = require('../models/packages')

// ROUTES

router.post('/', async (req, res) => {
    try {
        const createdPackage = await Package.create(req.body);
        res.status(200).json(createdPackage);
    } catch (error) {
        res.status(400).json(error);
    }
})

router.get('/', async (req, res) => {
    try {
        const packages = await Package.find({});
        res.status(200).json(packages);
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports = router;