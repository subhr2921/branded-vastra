module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_orders', {
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
      invoice_no: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      total_amount: {
        type: Sequelize.STRING
      },
      gst_amount: {
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
    await queryInterface.dropTable('tbl_orders');
  }
};