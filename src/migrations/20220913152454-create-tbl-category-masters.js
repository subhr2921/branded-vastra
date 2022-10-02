'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_category_masters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      category_name: {
        type: Sequelize.STRING,
        allowNull:false
      },
      category_desc: {
        type: Sequelize.TEXT,
        allowNull:true
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull:true
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
    await queryInterface.dropTable('tbl_category_masters');
  }
};