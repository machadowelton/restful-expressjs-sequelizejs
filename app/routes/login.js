const express = require('express');
const router = express.Router();
const jwtManager = require('../sec/jwtManager');

router.get('/', (req, res) => {
    const [hash_type, hash] = req.headers.authorization.split(' ');
    const [email, senha] = Buffer.from(hash, 'base64').toString().split(':');
    const usuario = {
        id: 1,
        email: email,
        permissao: 'leitor'
    }
    jwtManager.gerarToken(usuario)
        .then((token) => {
            res.json({
                jwt: token
            });
        })
        .catch((err) => {
            res.json(err);
        });
});

module.exports = router;