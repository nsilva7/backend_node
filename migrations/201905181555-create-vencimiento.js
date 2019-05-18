'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Vencimientos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      inicio_validez: {
        type: Sequelize.DATEONLY,
        allowNull:false
      },
      fin_validez: {
        type: Sequelize.DATEONLY,
        allowNull:false
      },
      dias_validez: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Vencimientos');
  }
};