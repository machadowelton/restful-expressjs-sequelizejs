const routeValidator = (req, res, next, roles = []) => {
  if (typeof roles === 'string') roles = roles[roles];
  const { permissao } = req.security;
  if (roles.includes(permissao)) next();
  else res.status(401).json({ erro: 'Você não tem permissão' });
  // if (!roles.length && !roles.includes(req.security.permissao))
  //   res.status(401).json({ mensagem: 'Você não tem permissão' });
  // else next();
};

module.exports = routeValidator;
