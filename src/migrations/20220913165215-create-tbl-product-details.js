'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_product_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:{
            tableName:'tbl_products'
          },
          key:'id'
        }
      },
      size_id: {
        type: Sequelize.INTEGER,
        allowNull:true,
        references:{
          model:{
            tableName:'tbl_size_masters'
          },
          key:'id'
        }
      },
      color_id: {
        type: Sequelize.INTEGER,
        allowNull:true,
        references:{
          model:{
            tableName:'tbl_color_masters'
          },
          key:'id'
        }
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      sold: {
        type: Sequelize.INTEGER
      },
      defective: {
        type: Sequelize.INTEGER
      },
      available: {
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
    await queryInterface.dropTable('tbl_product_details');
  }
};