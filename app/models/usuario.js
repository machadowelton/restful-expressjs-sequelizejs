'use strict';
module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define(
    'Usuario',
    {
      email: DataTypes.STRING,
      salt: DataTypes.STRING,
      senha: DataTypes.STRING,
      permissao: DataTypes.STRING,
    },
    {}
  );
  Usuario.associate = function(models) {
    Usuario.hasOne(models.Leitor, {
      foreignKey: 'UsuarioId',
      as: 'usuario',
    });
    Usuario.hasOne(models.Operador, {
      foreignKey: 'UsuarioId',
      as: 'usuario',
    });
  };
  return Usuario;
};
