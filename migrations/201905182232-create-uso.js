'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Usos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_cliente : {
        type: Sequelize.INTEGER,
        references: {
          model: 'Clientes',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      puntaje_utilizado: {
        type:Sequelize.INTEGER,
        allowNull:false
      },
      fecha: {
        type:Sequelize.DATEONLY,
        allowNull:false
      },
      concepto: {
        type: Sequelize.STRING,
        allowNull:false
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Usos');
  }
};
