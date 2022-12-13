const express = require('express');

const Bed = require('../model/bed');

const router = express.Router();

router.get('/bed', async(req, res) => {
    try {
        const beds = await Bed.find().populate('clamp');
 
         return res.send({ beds });
    } catch(err) {
        return res.status(400).send({error: err})
    }
});

router.get('/bed/:bedId', async(req, res) => {
    try {
        const bed = await Bed.findById(req.params.bedId);

        return res.send({ bed });
    } catch(err) {
        return res.status(400).send({ error: 'Erro ao recuperar usuário'});
    } 
});

router.post('/bed', async(req, res) => {
    try {
        const bedId = await Bed.findOne({bedIdentifier: req.body.bedIdentifier});
        const defaultBed = "00:00:00:00:00:00"

        if (bedId && bedId != defaultBed) {
            return res.status(400).send("leito já cadastrado");
        } else {
            const bed = await Bed.create(req.body);
            return res.send(bed);
        }
    } catch (err) {
        return res.status(400).send({ error: err});
    }
});

router.put('/bed/:bedIdentifier', async(req, res) => {
    try {
        const {clamp} = req.body
        
        const updateBed = await Bed.findOneAndUpdate(
            {bedIdentifier: req.params.bedIdentifier},
            {clamp: clamp},
            {new: true}
        );

        return res.send(updateBed);
    } catch (err) {
        return res.status(400).send({ error: err});
    }
});

router.delete('/bed/:bedId', async(req, res) => {
    try {
        await Bed.findByIdAndRemove(req.params.bedId);

        return res.send();
    } catch(err) {
        return res.status(400).send({ error: 'Erro ao apagar leito'});
    }
});

module.exports = server => server.use('/api', router);
