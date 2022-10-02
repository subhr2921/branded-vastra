const { DataTypes , Model, Sequelize} = require("sequelize");
module.exports = (sequelize) =>{
  class tbl_user_masters extends Model {
    static associate(models){
      //define association
      // this.hasOne(models.tbl_brand_masters,{
      //   as:'brandM',
      //   foreignKey:'created_by'
      // })
      // this.hasOne(models.tbl_color_masters,{
      //   as:'colorM',
      //   foreignKey:'created_by'
      // })
      // this.hasOne(models.tbl_size_masters,{
      //   as:'sizeM',
      //   foreignKey:'created_by'
      // })
      // this.hasOne(models.tbl_products,{
      //   as:'products',
      //   foreignKey:'created_by'
      // })
      this.belongsTo(models.tbl_role_masters,{
        as:'roleM',
        foreignKey:'role_id'
      })
    }
  }
  tbl_user_masters.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull:false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull:false
    },
    username: {
      type: DataTypes.STRING,
      allowNull:false
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false
    },
    mobile_number: {
      type: DataTypes.STRING(11),
      allowNull:false
    },
    gender: {
      type: DataTypes.INTEGER
    },
    role_id: {
      type: DataTypes.INTEGER,
      references:{
        model:{
          tableName:'tbl_role_masters'
        },
        key:'id'
      }
    },
    status: {
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
    modelName:'tbl_user_masters'
  });
  return tbl_user_masters;
}