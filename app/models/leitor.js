'use strict';
module.exports = (sequelize, DataTypes) => {
  const Leitor = sequelize.define(
    'Leitor',
    {
      nome: DataTypes.STRING,
      sobrenome: DataTypes.STRING,
      dat_nascimento: DataTypes.DATE,
      email: DataTypes.STRING,
      cpf: DataTypes.STRING,
    },
    {}
  );
  Leitor.associate = function(models) {
    Leitor.belongsTo(models.Usuario);
  };
  return Leitor;
};
