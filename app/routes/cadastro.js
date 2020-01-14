const express = require('express');

const router = express.Router();
const Leitor = require('../services/leitor');
const Operador = require('../services/operador');

router.post('/leitor', (req, res) => {
  const leitor = req.body;
  Leitor.inserir(leitor)
    .then(() => {
      res.status(201).end();
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

router.post('/operador', (req, res) => {
  const operador = req.body;
  Operador.inserir(operador)
    .then(() => {
      res.status(201).end();
    })
    .catch(err => {
      res.status(500).json({ err: err.message });
    });
});

module.exports = router;
