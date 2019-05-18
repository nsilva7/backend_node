'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Clientes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull:false
      },
      apellido: {
        type: Sequelize.STRING,
        allowNull:false
      },
      nro_documento: {
        type:Sequelize.STRING,
        allowNull:false
      },
      tipo_documento: {
        type:Sequelize.STRING,
        allowNull:false
      },
      nacionalidad: {
        type:Sequelize.STRING,
        allowNull:false
      },
      email: {
        type:Sequelize.STRING,
        allowNull:false
      },
      telefono: {
        type:Sequelize.STRING,
        allowNull:false
      },
      fecha_nacimiento: {
        type:Sequelize.DATEONLY,
        allowNull:false
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Clientes');
  }
};