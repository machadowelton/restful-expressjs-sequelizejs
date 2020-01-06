const bcrypt = require('bcryptjs');
const { Usuario } = require('../models');

module.exports = {
  async inserir(usuario) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(usuario.senha, salt);
      usuario.salt = salt;
      usuario.senha = hash;
      return await Usuario.create(usuario);
    } catch (error) {
      throw new Error(error);
    }
  },
  async validarUsuarioSenha(userEmail, senha) {
    try {
      const result = await Usuario.findOne({ where: { email: userEmail } });
      if (!result) throw new Error('Combinação usuário e senha falhou');
      const usuario = result.dataValues;
      const hash = await bcrypt.hash(senha, usuario.salt);
      if (hash === usuario.senha) {
        usuario.salt = undefined;
        usuario.senha = undefined;
        return usuario;
      }
      throw new Error('Combinação usuário e senha falhou');
    } catch (error) {
      throw new Error(error);
    }
  },
};
