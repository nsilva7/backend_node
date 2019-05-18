'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bolsa = sequelize.define('Bolsa', {
    fecha_asignacion: {type:DataTypes.DATEONLY,allowNull:false},
    fecha_caducidad: {type:DataTypes.DATEONLY,allowNull:false},
    puntaje_asignado: {type:DataTypes.INTEGER,allowNull:false},
    puntaje_utilizado: {type:DataTypes.INTEGER,allowNull:false},
    saldo: {type:DataTypes.INTEGER,allowNull:false},
    monto_operacion: {type:DataTypes.INTEGER,allowNull:false},
  }, {tableName:'Bolsas',timestamps:false});
  
  Bolsa.associate = function(models) {
    Bolsa.belongsTo(models.Cliente, {
      as: 'cliente',
      foreignKey: 'id_cliente'
    });
  };
  return Bolsa;
};