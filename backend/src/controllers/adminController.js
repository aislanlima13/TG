const express = require('express');

const Bed = require('../model/bed');
const Clamp = require('../model/clamp');

const router = express.Router();

router.get('/admin', async(req, res) => {
    try {
        const bed = await Bed.find().populate('clamp');
        return res.json(bed);
    } catch(err) {
     return res.status(400).send({ error: err});
    } 
 });

 module.exports = server => server.use('/api', router);
