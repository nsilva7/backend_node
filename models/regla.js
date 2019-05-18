'use strict';
module.exports = (sequelize, DataTypes) => {
  const Regla = sequelize.define('Regla', {
    limite_inferior: {type:DataTypes.INTEGER,allowNull:false},
    limite_superior: {type:DataTypes.INTEGER,allowNull:true},
    monto: {type:DataTypes.INTEGER,allowNull:false},
  }, {tableName:'Reglas',timestamps:false});
  return Regla;
};