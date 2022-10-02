const { DataTypes , Model} = require("sequelize");
module.exports = (sequelize) =>{
  class tbl_brand_masters extends Model {
    static associate(models){
      this.hasOne(models.tbl_products,{
        as:'products',
        foreignKey:'brand_id'
      })
      // this.belongsTo(models.tbl_user_master,{
      //   as:'user',
      //   foreignKey:'created_by'
      // })
    }
  }
  tbl_brand_masters.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    brand_code: {
      type: DataTypes.STRING,
      allowNull:false
    },
    brand_name: {
      type: DataTypes.STRING,
      allowNull:true
    },
    brand_desc: {
      type: DataTypes.TEXT,
      allowNull:true
    },
    brand_logo: {
      type: DataTypes.STRING,
      allowNull:true
    },
    created_by: {
      type: DataTypes.INTEGER,
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
    modelName:'tbl_brand_masters'
  });
  return tbl_brand_masters;
}