const express = require('express');

const router = express.Router();
const Leitor = require('../services/leitor');

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

module.exports = router;
