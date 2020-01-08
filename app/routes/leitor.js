const express = require('express');

const router = express.Router();

const jwtManager = require('../sec/jwtManager');
const Leitor = require('../services/leitor');

router.use(jwtManager.validarToken);
router.use((req, res, next) => {
  if (req.security.permissao === 'leitor') next();
  else {
    res
      .status(401)
      .json({ mensagem: 'Você não tem permissão para este recurso' });
  }
});
router
  .route('/:id_leitor([0-9]+)')
  .get((req, res) => {
    Leitor.buscarPorId(req.params.id_leitor)
      .then(leitor => {
        if (!leitor) {
          const err = new Error('Não encontrado');
          err.status = 404;
          throw err;
        } else {
          res.json(leitor);
        }
      })
      .catch(error => {
        res
          .status(error.status || 500)
          .json({ erro: error.message || 'Ocorreu um erro no servidor' });
      });
  })
  .delete((req, res) => {
    res.json({ mensagem: 'deleta 1' });
  });
router
  .route('/')
  .get((req, res) => {
    res.json({ mensagem: 'busca todos' });
  })
  .put((req, res) => {
    res.json({ mensagem: 'atualiza 1' });
  });

module.exports = router;
