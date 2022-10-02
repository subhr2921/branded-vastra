const { DataTypes , Model} = require("sequelize");
module.exports = (sequelize) =>{
  class tbl_category_masters extends Model {
    static associate(models){
      this.hasOne(models.tbl_products,{
        as:'products',
        foreignKey:'category_id'
      })
    }
  }
  tbl_category_masters.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull:false
    },
    category_desc: {
      type: DataTypes.TEXT,
      allowNull:true
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull:true
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
    modelName:'tbl_category_masters'
  });
  return tbl_category_masters;
}