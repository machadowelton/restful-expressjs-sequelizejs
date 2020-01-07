const { Operador } = require('../models');
const Usuario = require('./usuario');

module.exports = {
  async inserir(operador) {
    try {
      const { usuario } = operador;
      usuario.permissao = 'operador';
      const usuarioSave = await Usuario.inserir(usuario);
      const operadorSave = await Operador.create(operador);
      await operadorSave.setUsuario(usuarioSave);
    } catch (error) {
      throw new Error('Ocorreu um erro');
    }
  },
};
