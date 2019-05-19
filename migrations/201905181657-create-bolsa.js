'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Bolsas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fecha_asignacion: {
        type:Sequelize.DATEONLY,
        allowNull:false
      },
      fecha_caducidad: {
        type:Sequelize.DATEONLY,
        allowNull:false
      },
      puntaje_asignado: {
        type:Sequelize.INTEGER,
        allowNull:false
      },
      puntaje_utilizado: {
        type:Sequelize.INTEGER,
        allowNull:false
      },
      saldo: {
        type:Sequelize.INTEGER,
        allowNull:false
      },
      monto_operacion: {
        type:Sequelize.INTEGER,
        allowNull:false
      },
      id_cliente : {
        type: Sequelize.INTEGER,
        references: {
          model: 'Clientes',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Bolsas');
  }
};
