'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_order_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customer_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:{
            tableName:'tbl_customer_masters'
          },
          key:'id'
        }
      },
      order_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:{
            tableName:'tbl_orders'
          },
          key:'id'
        }
      },
      product_id:{
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:{
            tableName:'tbl_products'
          },
          key:'id'
        }
      },
      product_unique_no: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      mrp: {
        type: Sequelize.STRING
      },
      discount: {
        type: Sequelize.STRING
      },
      gst_amount: {
        type: Sequelize.STRING
      },
      selling_price: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tbl_order_details');
  }
};