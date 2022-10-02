const { DataTypes , Model} = require("sequelize");
module.exports = (sequelize) =>{
  class tbl_orders extends Model {
    static associate(models){
      this.belongsTo(models.tbl_customer_masters,{
        as:'customers',
        foreignKey:'customer_id'
      });
      this.hasMany(models.tbl_order_details,{
        as:'orderDetails',
        foreignKey:'order_id'
      })
    }
  }
  tbl_orders.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:{
          tableName:'tbl_customer_masters'
        },
        key:'id'
      }
    },
    invoice_no: {
      type: DataTypes.STRING,
      allowNull:true,
    },
    total_amount: {
      type: DataTypes.STRING
    },
    gst_amount: {
      type: DataTypes.STRING
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  },{
    sequelize,
    modelName:'tbl_orders'
  });
  return tbl_orders;
}