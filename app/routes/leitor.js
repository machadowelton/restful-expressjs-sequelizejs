const express = require('express');

const router = express.Router();
const jwtManager = require('../sec/jwtManager');
// const Leitor = require('../services/leitor')

// route_cadastro.post((req, res) => {
//     Leitor.inserir(req.boody)
//         .then(() => {
//             res.status(201).end();
//         })
//         .catch((err) => {
//             res.status(500).end();
//         });
// });

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
    res.json({ mensagem: 'busca 1' });
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
