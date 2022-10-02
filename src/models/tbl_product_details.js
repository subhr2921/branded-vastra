const { DataTypes , Model} = require("sequelize");
module.exports = (sequelize) =>{
  class tbl_product_details extends Model {
    static associate(models){
      //define association
      // this.belongsTo(models.tbl_user_master,{
      //   as:'user',
      //   foreignKey:'created_by'
      // })
      this.belongsTo(models.tbl_products,{
        as:'products',
        foreignKey:'product_id'
      })
      this.belongsTo(models.tbl_color_masters,{
        as:'colorM',
        foreignKey:'color_id'
      })
      this.belongsTo(models.tbl_size_masters,{
        as:'sizeM',
        foreignKey:'size_id'
      })
    }
  }
  tbl_product_details.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:{
          tableName:'tbl_products'
        },
        key:'id'
      }
    },
    size_id: {
      type: DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:{
          tableName:'tbl_size_maters'
        },
        key:'id'
      }
    },
    color_id: {
      type: DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:{
          tableName:'tbl_product_details'
        },
        key:'id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER
    },
    sold: {
      type: DataTypes.INTEGER
    },
    defective: {
      type: DataTypes.INTEGER
    },
    available: {
      type: DataTypes.INTEGER
    },
    created_by: {
      type: DataTypes.INTEGER
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
    modelName:'tbl_product_details'
  });
  return tbl_product_details;
}