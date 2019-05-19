'use strict';
module.exports = (sequelize, DataTypes) => {
  const Uso = sequelize.define('Uso', {
    puntaje_utilizado: {type:DataTypes.INTEGER,allowNull:false},
    fecha: {type:DataTypes.DATEONLY,allowNull:false},
    id_canje: {type:DataTypes.INTEGER,allowNull:false},
    id_cliente: {type:DataTypes.INTEGER,allowNull:false}
  }, {tableName:'Usos',timestamps:false});

  Uso.associate = function(models) {
    Uso.belongsTo(models.Cliente, {
      as: 'cliente',
      foreignKey: 'id_cliente'
    });
  };

  Uso.associate = function(models) {
    Uso.belongsTo(models.Canje, {
      as: 'canje',
      foreignKey: 'id_canje'
    });
  };

  Uso.associate = function(models) {
    Uso.hasMany(models.DetalleUso, {
      foreignKey: 'id_uso',
      as: 'detalles',

    });
  };
  return Uso;
};
