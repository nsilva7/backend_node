'use strict';
module.exports = (sequelize, DataTypes) => {
  const Canje = sequelize.define('Canje', {
    descripcion: {type:DataTypes.STRING,allowNull:false},
    puntos_requeridos: {type:DataTypes.INTEGER,allowNull:false},
  }, {tableName:'Canjes',timestamps:false});
  return Canje;
};