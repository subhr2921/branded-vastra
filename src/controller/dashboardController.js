const db =  require("../models");
const path = require("path")
const moment = require("moment")
const { commonResponse } =  require("../helpers/commonResponse");
const environment = process.env.ENVIRONMENT || "development";
const config = require(__dirname + "/../config/config.json")[environment];
const { QueryTypes } = require("sequelize");

const getProductCategoryWise = async (req,res) =>{
    try{
        let data = await db.sequelize.query(
            `SELECT cm.id, cm.category_name, SUM(pd.available) available_products FROM tbl_category_masters cm JOIN tbl_products p ON cm.id = p.category_id JOIN tbl_product_details pd ON p.id = pd.product_id GROUP BY cm.id;`,
            {
              replacements: {},
              plain: false,
              raw: true,
              type: QueryTypes.SELECT,
            }
          );
        return commonResponse(res, 200, data);
    }catch(err){
        return commonResponse(res, 500, [], err.message, "", environment);
    }
}


const getSaleAmount = async(req,res) => {
    try{
        let fromDate = req.params.from_date || req.query.from_date || moment().subtract(7,'d').format('YYYY-MM-DD');;
        let toDate = req.params.to_date || req.query.to_date || moment().format('YYYY-MM-DD');
        let data = await db.sequelize.query(
            `SELECT DATE(createdAt) date, SUM(total_amount) amount from tbl_orders WHERE DATE(createdAt) BETWEEN :fromDate AND :toDate GROUP BY DATE(createdAt)`,
            {
                replacements: { fromDate: fromDate, toDate: toDate },
              plain: false,
              raw: true,
              type: QueryTypes.SELECT,
            }
          );
        return commonResponse(res, 200, data);
    }catch(err){
        return commonResponse(res, 500, [], err.message, "", environment);
    }
}

const getCategoryWiseSale = async(req,res) => {
    try{
        let data = await db.sequelize.query(
            `SELECT cm.category_name, SUM(od.quantity) sale_product, SUM(od.selling_price) selling_price FROM tbl_category_masters cm JOIN tbl_products p ON cm.id = p.category_id JOIN tbl_order_details od ON p.id = od.product_id  GROUP BY cm.id`,
            {
              replacements: {},
              plain: false,
              raw: true,
              type: QueryTypes.SELECT,
            }
          );
        return commonResponse(res, 200, data);
    }catch(err){
        return commonResponse(res, 500, [], err.message, "", environment);
    }
}

const dashboardController = {
    getProductCategoryWise,
    getSaleAmount,
    getCategoryWiseSale
};
  
  module.exports = dashboardController;