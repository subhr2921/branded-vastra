const { DataTypes , Model} =  require("sequelize");
module.exports = (sequelize) =>{
  class tbl_customer_masters extends Model {
    static associate(models){
      this.hasMany(models.tbl_orders,{
        as:'productDetails',
        foreignKey:'color_id'
      })
    }
  }
  tbl_customer_masters.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.STRING
    },
    mobile_no: {
      type: DataTypes.STRING,
      allowNull:false
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
    modelName:'tbl_customer_masters'
  });
  return tbl_customer_masters;
}