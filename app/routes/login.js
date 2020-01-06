const express = require('express');

const router = express.Router();
const jwtManager = require('../sec/jwtManager');
const Usuario = require('../services/usuario');

router.get('/', async (req, res) => {
  const hash = req.headers.authorization.split(' ')[1];
  const [email, senha] = Buffer.from(hash, 'base64')
    .toString()
    .split(':');
  try {
    const usuario = await Usuario.validarUsuarioSenha(email, senha);
    const token = await jwtManager.gerarToken(usuario);
    res.json({
      tokenJWT: token,
    });
  } catch (error) {
    res.status(400).json({
      erro: error,
    });
  }
});

module.exports = router;
