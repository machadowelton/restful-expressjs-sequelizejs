const express = require('express');
const router = express.Router();
const jwtManager = require('../sec/jwtManager');


router.post((req, res) => {
    res.json({ mensagem: 'ok' });
});

router.use(jwtManager.validarToken);
router.route('/:id_leitor([0-9]+)')
    .get((req, res) => {
        res.json({ mensagem: 'busca 1' })
    })
    .delete((req, res) => {
        res.json({ mensagem: 'deleta 1' })
    });

router.use((req, res, next) => {
    if(req.security.permissao === 'leitor') next();
    else {
        res.status(401).json({mensagem: 'Você não tem permissão para este recurso'})
    }
});
router.route('/')
    .get((req, res) => {
        console.log(req);
        res.json({ mensagem: 'busca todos' })
    })
    .put((req, res) => {
        res.json({ mensagem: 'atualiza 1' })
    });


module.exports = router;