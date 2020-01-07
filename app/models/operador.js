'use strict';
module.exports = (sequelize, DataTypes) => {
  const Operador = sequelize.define('Operador', {
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    cpf: DataTypes.STRING,
    UsuarioId: DataTypes.INTEGER
  }, {});
  Operador.associate = function(models) {
    Operador.belongsTo(models.Usuario);
  };
  return Operador;
};