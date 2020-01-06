const express = require('express');
const compression = require('compression');
const router_login = require('./app/routes/login');
const router_leitor = require('./app/routes/leitor');
const router_cadastro = require('./app/routes/cadastro');
const router_status = express.Router();

const app = express();
const bodyparser = require('body-parser');

app.use(compression());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
const port = process.env.PORT || 8000;



router_status.get('/', (req, res) => {
  res.json({ mensagem: 'ok' });
});

app.use('/rest/status', router_status);
app.use('/rest/login', router_login);
app.use('/rest/leitor', router_leitor);
app.use('/rest/cadastro', router_cadastro);
app.use((req, res, next) => {
  const err = new Error('Recurso não encontrado');
  next(err);
});
app.use((err, req, res, next) => {
  res.status(404).json({ mensagem: err.message });
});
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
