'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cliente = sequelize.define('Cliente', {
    nombre: {type:DataTypes.STRING,allowNull:false},
    apellido: {type:DataTypes.STRING,allowNull:false},
    nro_documento: {type:DataTypes.STRING,allowNull:false},
    tipo_documento: {type:DataTypes.STRING,allowNull:false},
    nacionalidad: {type:DataTypes.STRING,allowNull:false},
    email: {type:DataTypes.STRING,allowNull:false},
    telefono: {type:DataTypes.STRING,allowNull:false},
    fecha_nacimiento: {type:DataTypes.DATEONLY,allowNull:false},
  }, {tableName:'Clientes',timestamps:false});
  return Cliente;
};
