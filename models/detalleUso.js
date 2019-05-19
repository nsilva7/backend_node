'use strict';
module.exports = (sequelize, DataTypes) => {
  const DetalleUso = sequelize.define('DetalleUso', {
    puntaje_utilizado: {type:DataTypes.INTEGER,allowNull:false},
  }, {tableName:'DetallesUsos',timestamps:false});

  DetalleUso.associate = function(models) {
    DetalleUso.belongsTo(models.Uso, {
      as: 'uso',
      foreignKey: 'id_uso'
    });
  };

  DetalleUso.associate = function(models) {
    DetalleUso.belongsTo(models.Bolsa, {
      as: 'bolsa',
      foreignKey: 'id_bolsa'
    });
  };
  return DetalleUso;
};
