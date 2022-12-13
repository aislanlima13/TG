const express = require('express');

const User = require('../model/user');

const router = express.Router();

router.get('/user', async(req, res) => {
   try {
        const users = await User.find();

        return res.send({ users });
   } catch(err) {
    return res.status(400).send({ error: 'Erro ao listar usuários'});
   } 
});

router.get('/user/:userId', async(req, res) => {
    try {
        const user = await User.findById(req.params.userId);

        return res.send({ user });
    } catch(err) {
        return res.status(400).send({ error: 'Erro ao recuperar usuário'});
    } 
});

router.post('/user', async(req, res) => {
    try {
        const userName = await User.findOne({user: req.body.user});
        const email = await User.findOne({email: req.body.email});

        if (userName || email) {
            return res.status(400).send("usuário já cadastrado");
        } else {
            const user = await User.create(req.body);
            return res.send(user);
        }
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao criar usuário'});
    }
});

router.put('/user/:userId', async(req, res) => {
    try {
        const { name, lastName, user, password, branch, occupation, phone, email} = req.body 
        
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
            name,
            lastName,
            user,
            password,
            branch,
            occupation,
            phone,
            email
        }, {new: true});

        return res.send(updatedUser);
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao autalizar usuário'});
    }
});

router.delete('/user/:userId', async(req, res) => {
    try {
        await User.findByIdAndRemove(req.params.userId);

        return res.send();
    } catch(err) {
        return res.status(400).send({ error: 'Erro ao apagar usuário'});
    }
});

router.post('/login', async(req, res) => {
    try {
        const user = req.body.user;
        const password = req.body.password;

        const userLogged = await User.findOne({user: user, password: password});

        if (!userLogged) {
            return res.status(401).send("usuário ou senha incorreto");
        } else {
            return res.send(userLogged);
        }
    } catch(err) {
        return res.status(400).send({ error: err});
    }
});

module.exports = server => server.use('/api', router);
