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
      id_canje : {
        type: Sequelize.INTEGER,
        references: {
          model: 'Canjes',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Usos');
  }
};
