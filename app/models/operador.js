'use strict';
module.exports = (sequelize, DataTypes) => {
  const Operador = sequelize.define('Operador', {
    nome: DataTypes.STRING,
    sobrenome: DataTypes.STRING,
    email: DataTypes.STRING,
    cpf: DataTypes.STRING
  }, {});
  Operador.associate = function(models) {
    Operador.belongsTo(models.Usuario);
  };
  return Operador;
};