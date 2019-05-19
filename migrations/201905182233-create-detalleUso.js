'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('DetallesUsos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_uso : {
        type: Sequelize.INTEGER,
        references: {
          model: 'Usos',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      puntaje_utilizado: {
        type:Sequelize.DATEONLY,
        allowNull:false
      },
      id_bolsa : {
        type: Sequelize.INTEGER,
        references: {
          model: 'Bolsas',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('DetallesUsos');
  }
};
