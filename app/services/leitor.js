const { Leitor } = require('../models');
const Usuario = require('./usuario');

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
  async buscarPorId(idLeitor) {
    try {
      //const leitor = await Leitor.findByPk(idLeitor);
      const leitor = await Leitor.findOne({
        attributes: { exclude: ['UsuarioId'] },
        where: {
          id: idLeitor,
        },
      });
      // const prop = ['UsuarioId'];
      // const newLeitor = Object.keys(leitor.dataValues).reduce((object, key) => {
      //   if (!prop.includes(key)) {
      //     object[key] = leitor[key];
      //   }
      //   return object;
      // }, {});
      // return newLeitor;
      return leitor;
    } catch (error) {
      throw new Error(error);
    }
  },
};
