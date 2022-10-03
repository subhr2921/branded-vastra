const { DataTypes , Model} = require("sequelize");
module.exports = (sequelize) =>{
  class tbl_products extends Model {
    static associate(models){
      //define association
      this.belongsTo(models.tbl_brand_masters,{
        as:'brandM',
        foreignKey:'brand_id'
      })
      // this.belongsTo(models.tbl_user_master,{
      //   as:'user',
      //   foreignKey:'created_by'
      // })
      this.hasOne(models.tbl_product_details,{
        as:'productDetails',
        foreignKey:'product_id'
      })
      this.belongsTo(models.tbl_category_masters,{
        as:'categoryM',
        foreignKey:'category_id'
      })
      this.hasMany(models.tbl_order_details,{
        as:'orderDetails',
        foreignKey:'product_id'
      })
    }
  }
  tbl_products.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    unique_no: {
      type: DataTypes.STRING,
      allowNull:false
    },
    brand_id: {
      type: DataTypes.INTEGER,
      allowNull:true,
      references:{
        model:{
          tableName:'tbl_brand_masters'
        },
        key:'id'
      }
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:{
          tableName:'tbl_category_masters'
        },
        key:'id'
      }
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull:false
    },
    description: {
      type: DataTypes.TEXT
    },
    mrp: {
      type: DataTypes.STRING,
      allowNull:false
    },
    discount: {
      type: DataTypes.STRING
    },
    cost_price:{
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.STRING
    },
    created_by: {
      type: DataTypes.STRING
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE
    }
  },{
    sequelize,
    paranoid:true,
    modelName:'tbl_products'
  });
  return tbl_products;
}