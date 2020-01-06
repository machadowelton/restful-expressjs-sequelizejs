const jwt = require('jsonwebtoken');

const secretKey = 'TdvaEJk3MLhe9bAYaLuRKW6BCcAi2AlR3sQjT0Jw-wk';

module.exports = {
  gerarToken(usuario) {
    return new Promise((resolve, reject) => {
      const payload = {
        id: usuario.id,
        email: usuario.email,
        permissao: usuario.permissao,
      };
      try {
        const token = jwt.sign(
          {
            data: payload,
          },
          secretKey,
          {
            expiresIn: 30 * 60,
          }
        );
        resolve(token);
      } catch (error) {
        reject(error);
      }
    });
  },
  validarToken(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
      res.status(401).json({
        mensagem: 'Requisição sem token',
      });
    } else if (!authorization.startsWith('Bearer ')) {
      res.status(400).json({
        mensagem: 'Token inválido',
      });
    } else {
      const token = authorization.split(' ')[1];
      jwt.verify(token, secretKey, (err, decoded) => {
        if (!err) {
          req.security = {
            email: decoded.data.email,
            permissao: decoded.data.permissao,
          };
          next();
        } else {
          switch (err.name) {
            case 'TokenExpiredError':
              res.status(400).json({ mensagem: 'Token expirou' });
              break;
            case 'JsonWebTokenError':
              switch (err.message) {
                case 'jwt malformed':
                  res.status(400).json({ mensagem: 'Token mal formado' });
                  break;
                case 'jwt signature is required':
                  res.status(400).json({ mensagem: 'Token não assinado' });
                  break;
                case 'invalid signature':
                  res
                    .status(400)
                    .json({ mensagem: 'Assinatura do token inválida' });
                  break;
                default:
                  res.status(400).json({ mensagem: 'Token inválido' });
                  break;
              }
              break;
            default:
              res.status(500).json({
                mensagem: 'Ocorreu um erro na validação do token',
              });
              break;
          }
        }
      });
    }
  },
};
