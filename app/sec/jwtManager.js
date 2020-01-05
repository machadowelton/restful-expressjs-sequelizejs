const jwt = require('jsonwebtoken');

const secret_key = 'TdvaEJk3MLhe9bAYaLuRKW6BCcAi2AlR3sQjT0Jw-wk';

module.exports = {
    gerarToken(usuario) {
        return new Promise((resolve, reject) => {
            const payload = {
                id: usuario.id,
                email: usuario.email,
                permissao: usuario.permissao
            };
            try {
                const token = jwt.sign(
                    {
                        data: payload
                    },
                    secret_key,
                    {
                        expiresIn: 30 * 60
                    }
                );
                resolve(token);
            } catch (error) {
                reject(error);
            }
        });
    },
    validarToken(req, res, next) {
        const authorization = req.headers.authorization;
        if (!authorization) {
            res.status(401).json({
                mensagem: 'Requisição sem token'
            });
        } else {
            if (!authorization.startsWith('Bearer ')) {
                res.status(400).json({
                    mensagem: 'Token inválido'
                });
            } else {
                const token = authorization.split(' ')[1];
                jwt.verify(token, secret_key, (err, decoded) => {
                    if(!err) {
                        next();
                    } else {
                        res.json(err);
                    }
                });
            }
        }
    }
}