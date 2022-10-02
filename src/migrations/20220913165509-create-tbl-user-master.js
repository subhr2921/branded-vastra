'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_user_masters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull:false
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull:false
      },
      username: {
        type: Sequelize.STRING,
        allowNull:false
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
        allowNull:false
      },
      mobile_number: {
        type: Sequelize.STRING(11),
        allowNull:false
      },
      gender: {
        type: Sequelize.INTEGER
      },
      role_id: {
        type: Sequelize.INTEGER,
        references:{
          model:{
            tableName:'tbl_role_masters'
          },
          key:'id'
        }
      },
      status: {
        type: Sequelize.INTEGER
      },
      created_by: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    },{
      paranoid:true
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tbl_user_masters');
  }
};