const db =  require("../models");
const Ajv =  require("ajv");
const { productValidator } =  require("./validators");
const { commonResponse } =  require("../helpers/commonResponse");
const { extractTokenInfo } =  require("../helpers/extractTokenInfo");
const moment =  require("moment");
const readXlsxFile = require('read-excel-file/node')
const path = require("path")
const environment = process.env.ENVIRONMENT || "development";
const config = require(__dirname + "/../config/config.json")[environment];
const { QueryTypes } = require("sequelize");

const ajv = new Ajv();

const addProduct = async (req, res) => {
  try {
    const headers = req.headers;
    const loginInfo = extractTokenInfo(res, headers);
    if (loginInfo === null) {
      return commonResponse(res, 400, [], [], "No user id found");
    }
    let duplicateCheck = await db.tbl_products.findOne({
      where: {
        unique_no: req.body.unique_no,
      },
    });
    if(duplicateCheck)
        return commonResponse(res, 409, [], [], "Duplicate Product-Id");
    let key = req.body.key || null;
    let status = req.body.status || null;
    delete req.body.key;
    delete req.body.status;
    const validate = ajv.compile(productValidator);
    req.body.brand_id = Number(req.body.brand_id);
    req.body.category_id = Number(req.body.category_id);
    req.body.size_id = Number(req.body.size_id);
    req.body.color_id = Number(req.body.color_id);
    req.body.quantity = Number(req.body.quantity);
    req.body.sold ? (req.body.sold = Number(req.body.sold)) : "";
    req.body.defective ? (req.body.defective = Number(req.body.defective)) : "";
    req.body.available ? (req.body.available = Number(req.body.available)) : "";

    var productTblData = {
      unique_no: req.body.unique_no,
      brand_id: req.body.brand_id || null,
      category_id: req.body.category_id,
      product_name: req.body.product_name,
      description: req.body.description || null,
      mrp: req.body.mrp,
      discount: req.body.discount,
      price: req.body.price,
      cost_price: req.body.cost_price,
      created_by: loginInfo.user_id || null,
    };

    var productDetailsTblData = {
      size_id: req.body.size_id || null,
      color_id: req.body.color_id  || null,
      quantity: req.body.quantity,
      sold: req.body.sold || null,
      defective: req.body.defective || null,
      available: req.body.available,
      created_by: loginInfo.user_id || null,
    };

    if (key !== null) {
      if (status !== null) {
        productTblData = {
          deletedAt: moment(),
        };
        productDetailsTblData = {
          deletedAt: moment(),
        };
      }
      delete productTblData.unique_no;
      await db.tbl_products.update(productTblData, {
        where: {
          id: key,
        },
      });
      await db.tbl_product_details.update(productDetailsTblData, {
        where: {
          product_id: key,
        },
      });
      return commonResponse(res, 200, []);
    }
    const valid = validate(req.body);
    if (!valid)
      return commonResponse(res, 400, [], validate.errors, "", environment);

    //Product table data create
    let productTblInsert = await db.tbl_products.create(productTblData);
    productTblInsert = JSON.parse(JSON.stringify(productTblInsert, null, 2));

    //Product details table data create
    productDetailsTblData.product_id = productTblInsert.id;
    let productDetailsTblInsert = await db.tbl_product_details.create(
      productDetailsTblData
    );

    if (productDetailsTblInsert)
      return commonResponse(res, 200, productDetailsTblInsert);
  } catch (err) {
    return commonResponse(res, 500, [], err.message, "", environment);
  }
};

const productList = async (req, res) => {
  try {
    let whereCondition = {};

    let productId = req.params.product_id || req.query.product_id || null;
    let uniqueNo = req.params.unique_no || req.query.unique_no || null;
    let brandId = req.params.brand_id || req.query.brand_id || null;
    let category_id =
      req.params.category_id || req.query.category_id || null;
    productId !== null ? (whereCondition.id = productId) : "";
    brandId !== null ? (whereCondition.brand_id = brandId) : "";
    uniqueNo !== null ? (whereCondition.unique_no = uniqueNo) : "";
    category_id !== null ? (whereCondition.category_id = category_id) : "";
    const brandList = await db.tbl_products.findAll({
      attributes: [
        "id",
        "unique_no",
        "brand_id",
        "category_id",
        "product_name",
        "description",
        "mrp",
        "discount",
        "price",
        "cost_price",
        "created_by",
        "createdAt",
      ],
      include: [
        {
          model: db.tbl_brand_masters,
          as: "brandM",
          attributes: ["id", "brand_code", "brand_logo", "brand_name"],
        },
        {
          model: db.tbl_category_masters,
          as: "categoryM",
          attributes: ["id", "category_name", "category_desc"],
        },
        {
          model: db.tbl_product_details,
          as: "productDetails",
          attributes: [
            "id",
            "product_id",
            "size_id",
            "color_id",
            "quantity",
            "sold",
            "defective",
            "available",
            "created_by",
          ],
          include: [
            {
              model: db.tbl_color_masters,
              as: "colorM",
              attributes: ["id", "color_name"],
            },
            {
              model: db.tbl_size_masters,
              as: "sizeM",
              attributes: ["id", "size", "size_value"],
            },
          ],
        },
      ],
      order: [["id", "DESC"]],
      where: whereCondition,
    });
    return commonResponse(res, 200, brandList);
  } catch (err) {
    return commonResponse(res, 500, [], err.message, "", environment);
  }
};

const excelProductImport = async (req, res) => {
  try{
    let filename = "";
    const headers = req.headers;
    const loginInfo = extractTokenInfo(res, headers);
    if (loginInfo === null) {
      return commonResponse(res, 400, [], [], "No user id found");
    }
    if (req.files.excel_file.size > 0) {
      filename = Date.now() + "_" + req.files.excel_file.name;
      let newPath = path.join(process.cwd(), "src/assets/uploads", filename);
      await req.files.excel_file.mv(newPath);
    }
    let duplicateProductIds = [];
    let excelFilePath =path.join(process.cwd(), "/src/assets/uploads/" + filename);
    readXlsxFile(excelFilePath).then((rows) => {
      rows.shift()
      rows.forEach(async(row) => {
        let duplicateCheck = await db.tbl_products.findAll({
          where: {
            unique_no: row[0],
          },
        });
        duplicateCheck = JSON.parse(JSON.stringify(duplicateCheck, null, 2));
        if(duplicateCheck.length>0){
          await db.tbl_products.update({
            mrp:row[2],
            discount: row[8],
            price: row[4],
            cost_price: row[3],
          },{
            where:{
              id:duplicateCheck[0].id
            }
          })
          await db.sequelize.query(
            `UPDATE tbl_product_details SET available = available + :available , quantity = quantity + :quantity WHERE product_id = :product_id`,
            {
              replacements: { quantity: Number(row[5]), available: Number(row[5]), product_id: duplicateCheck[0].id },
              plain: false,
              raw: true,
              type: QueryTypes.UPDATE,
            }
          );
        }else{
          var productTblData = {
            unique_no: row[0],
            brand_id: null,
            category_id: Number(row[6]),
            product_name: row[7],
            description: null,
            mrp: row[2],
            discount: row[8],
            price: row[4],
            cost_price: row[3],
            created_by: loginInfo.user_id || null,
          };
          //Product table data create
          let productTblInsert = await db.tbl_products.create(productTblData);
          productTblInsert = JSON.parse(JSON.stringify(productTblInsert, null, 2));
          
          var productDetailsTblData = {
            size_id: null,
            color_id: null,
            quantity: Number(row[5]),
            sold: null,
            defective: null,
            available: row[5],
            created_by: loginInfo.user_id || null,
          };
  
          //Product details table data create
          productDetailsTblData.product_id = productTblInsert.id;
          let productDetailsTblInsert = await db.tbl_product_details.create(
            productDetailsTblData
          );
        }
      });
    }).catch((err)=>{
      console.log('error', err.message)
    })
    return commonResponse(res, 200, []);
  }catch(err){
    return commonResponse(res, 500, [], err.message, "", environment);
  }
}


const productController = {
  addProduct,
  productList,
  excelProductImport
};

module.exports = productController;
