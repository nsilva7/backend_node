'use strict';
module.exports = (sequelize, DataTypes) => {
  const Vencimiento = sequelize.define('Vencimiento', {
    inicio_validez: {type:DataTypes.DATEONLY,allowNull:false},
    fin_validez: {type:DataTypes.DATEONLY,allowNull:false},
    dias_validez: {type:DataTypes.INTEGER,allowNull:false},
  }, {tableName:'Vencimientos',timestamps:false});
  return Vencimiento;
};