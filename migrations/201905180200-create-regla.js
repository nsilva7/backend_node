'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Reglas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      limite_inferior: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      limite_superior: {
        type: Sequelize.INTEGER,
        allowNull:true
      },
      monto: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Reglas');
  }
};