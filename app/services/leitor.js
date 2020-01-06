const { Leitor } = require('../models');
const Usuario = require('../services/usuario');

module.exports = {
  async inserir(leitor) {
    try {
      const { usuario } = leitor;
      usuario.permissao = 'leitor';
      const usuarioSave = await Usuario.inserir(usuario);
      const leitorSave = await Leitor.create(leitor);
      await leitorSave.setUsuario(usuarioSave);
    } catch (error) {
      throw new Error('Ocorreu um erro');
    }
  },
};
