const routes = require("express").Router();
const authController = require("../controller/authController")
const masterSetupController = require('../controller/masterSetupController')
const saleController = require('../controller/saleController')
const productController = require('../controller/productController')
const { verifyToken } = require("../middleware/verifyToken");
/** POST REQUEST */

routes.post("/user-login",authController.userLogin)
routes.post("/add-brand",verifyToken, masterSetupController.addBrand)
routes.post("/add-size",verifyToken,masterSetupController.addSize)
routes.post("/add-color",verifyToken,masterSetupController.addColor)
routes.post("/add-product",verifyToken,productController.addProduct)
routes.post("/add-category",verifyToken,masterSetupController.addCategory)
routes.post("/create-sale",verifyToken,saleController.createSale)

/** GET REQUEST */

routes.get("/get-brand-list/:brand_id?/:brand_name?",verifyToken,masterSetupController.getBrandList)
routes.get("/get-size-list/:size_id?/:size_value?",verifyToken,masterSetupController.getSizeList)
routes.get("/get-color-list/:color_id?/:color_name?",verifyToken,masterSetupController.getColorList)
routes.get("/get-product-list/:product_id?/:brand_id?/:unique_no?/:category_id?",verifyToken, productController.productList)
routes.get("/get-category-list/:id?/:category_name?",verifyToken,masterSetupController.getCategoryList)
routes.get("/get-invoice-no-details/:invoice_no?", verifyToken, saleController.getSaleDataByInvoiceNo)

module.exports = routes