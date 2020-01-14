const express = require('express');
const compression = require('compression');
const bodyparser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const configDocumentation = require('./app/config/swagger-config');

const routerLogin = require('./app/routes/login');
const routerLeitor = require('./app/routes/leitor');
const routerCadastro = require('./app/routes/cadastro');

const routerStatus = express.Router();

const app = express();

app.use(compression());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
const port = process.env.PORT || 8000;

routerStatus.get('/', (req, res) => {
  res.json({ mensagem: 'ok' });
});

app.use('/doc', swaggerUi.serve, swaggerUi.setup(configDocumentation));
app.use('/rest/status', routerStatus);
app.use('/rest/login', routerLogin);
app.use('/rest/leitor', routerLeitor);
app.use('/rest/cadastro', routerCadastro);
app.use((req, res, next) => {
  const err = new Error('Recurso não encontrado');
  err.status = 404;
  next(err);
});
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.status || 404).json({ mensagem: err.message });
});
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on port ${port}`);
});
