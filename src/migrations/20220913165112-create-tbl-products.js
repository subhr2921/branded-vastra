'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      unique_no: {
        type: Sequelize.STRING,
        allowNull:false
      },
      brand_id: {
        type: Sequelize.INTEGER,
        allowNull:true,
        references:{
          model:{
            tableName:'tbl_brand_masters'
          },
          key:'id'
        }
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:{
            tableName:'tbl_category_masters'
          },
          key:'id'
        }
      },
      product_name: {
        type: Sequelize.STRING,
        allowNull:false
      },
      description: {
        type: Sequelize.TEXT
      },
      mrp: {
        type: Sequelize.STRING,
        allowNull:false
      },
      discount: {
        type: Sequelize.STRING
      },
      cost_price:{
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.STRING
      },
      created_by: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('tbl_products');
  }
};