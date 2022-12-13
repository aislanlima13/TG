const express = require('express');

const Clamp = require('../model/clamp');

const router = express.Router();

 router.get('/clamp', async(req, res) => {
    try {
         const clamps = await Clamp.find();
 
         return res.send({ clamps });
    } catch(err) {
     return res.status(400).send({ error: err});
    } 
 });

router.post('/clamp', async(req, res) => {
    try {
        const m = await Clamp.findOne({m: req.body.m});

        if (m) {
            return res.status(400).send("clamp já cadastrado");
        } else {
            var clamp = {
                m: req.body.m,
                s: "0",
                statusDescription: "fechado",
                description: req.body.description
            }

            const save = await Clamp.create(clamp);
            return res.send(save);
        }
    } catch (err) {
        return res.status(400).send({ error: err});
    }
});

router.post('/clamp/update', async(req, res) => {
    try {
        var currentdate = new Date(); 
        var updateAt = currentdate.getDate() + "/"
            + (currentdate.getMonth()+1)  + "/" 
            + currentdate.getFullYear() + " - "  
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();

        const updatedClamp = await Clamp.findOneAndUpdate(
            {m: req.body.m},
            {
                s: req.body.s,
                statusDescription: req.body.s == "0" ? "fechado" : "aberto",
                updateAt: updateAt
            },
            {new: true}
        );

        return res.send(updatedClamp);
    } catch (err) {
        return res.status(400).send({ error: err});
    }
});

module.exports = server => server.use('/api', router);
