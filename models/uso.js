'use strict';
module.exports = (sequelize, DataTypes) => {
  const Uso = sequelize.define('Uso', {
    puntaje_utilizado: {type:DataTypes.INTEGER,allowNull:false},
    fecha: {type:DataTypes.DATEONLY,allowNull:false},
    concepto: {type:DataTypes.STRING,allowNull:false},
  }, {tableName:'Usos',timestamps:false});

  Uso.associate = function(models) {
    Uso.belongsTo(models.Cliente, {
      as: 'cliente',
      foreignKey: 'id_cliente'
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
