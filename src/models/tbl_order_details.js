const { DataTypes , Model} = require("sequelize");
module.exports = (sequelize) =>{
  class tbl_order_details extends Model {
    static associate(models){
      this.belongsTo(models.tbl_orders,{
        as:'orders',
        foreignKey:'order_id'
      })
      this.belongsTo(models.tbl_customer_masters,{
        as:'customers',
        foreignKey:'customer_id'
      })
      this.belongsTo(models.tbl_products,{
        as:'products',
        foreignKey:'product_id'
      })
    }
  }
  tbl_order_details.init({
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
    order_id: {
      type: DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:{
          tableName:'tbl_orders'
        },
        key:'id'
      }
    },
    product_id:{
      type: DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:{
          tableName:'tbl_products'
        },
        key:'id'
      }
    },
    product_unique_no: {
      type: DataTypes.STRING,
      allowNull:false,
      references:{
        model:{
          tableName:'tbl_products'
        },
        key:'unique_no'
      }
    },
    quantity: {
      type: DataTypes.INTEGER
    },
    mrp: {
      type: DataTypes.STRING
    },
    discount: {
      type: DataTypes.STRING
    },
    gst_amount: {
      type: DataTypes.STRING
    },
    selling_price: {
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
    modelName:'tbl_order_details'
  });
  return tbl_order_details;
}