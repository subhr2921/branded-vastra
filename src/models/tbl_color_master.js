const { DataTypes , Model, Sequelize} = require("sequelize");
module.exports = (sequelize) =>{
  class tbl_color_masters extends Model {
    static associate(models){
      //define association
      // this.belongsTo(models.tbl_user_master,{
      //   as:'user',
      //   foreignKey:'created_by'
      // })
      this.hasMany(models.tbl_product_details,{
        as:'productDetails',
        foreignKey:'color_id'
      })
    }
  }
  tbl_color_masters.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    color_name: {
      type: DataTypes.STRING,
      allowNull:true
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
    modelName:'tbl_color_masters'
  });
  return tbl_color_masters;
}