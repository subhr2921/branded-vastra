const { DataTypes , Model, Sequelize} = require("sequelize");
module.exports = (sequelize) =>{
  class tbl_role_masters extends Model {
    static associate(models){
      //define association
      // this.belongsTo(models.tbl_user_master,{
      //   as:'user',
      //   foreignKey:'created_by'
      // })
      // this.hasMany(models.tbl_user_master,{
      //   as:'user',
      //   foreignKey:'role_id'
      // })
    }
  }
  tbl_role_masters.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    role_name: {
      type: DataTypes.STRING,
      allowNull:false
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
    modelName:'tbl_role_masters'
  });
  return tbl_role_masters;
}