'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_brand_masters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      brand_code: {
        type: Sequelize.STRING,
        allowNull:false
      },
      brand_name: {
        type: Sequelize.STRING,
        allowNull:true
      },
      brand_desc: {
        type: Sequelize.TEXT,
        allowNull:true
      },
      brand_logo: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('tbl_brand_masters');
  }
};