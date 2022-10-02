const db = require("../models");
const Ajv = require("ajv");
const { brandValidator, categoryValidator, colorValidator, sizeValidator } = require("./validators");
const { commonResponse } = require("../helpers/commonResponse");
const { extractTokenInfo } = require("../helpers/extractTokenInfo");
const environment = process.env.ENVIRONMENT || "development"
const config = require(__dirname+"/../config/config.json")[environment]


const ajv = new Ajv();

/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */
const addBrand = async (req, res) =>{
    try{
        const headers = req.headers;
        const loginInfo = extractTokenInfo(res,headers)
        if(loginInfo===null){
            return commonResponse(res,400,[],[],"No user id found")
        }
        const validate = ajv.compile(brandValidator)
        let key = req.body.key || null;
        delete req.body.key;
        if(key!==null){
            await db.tbl_brand_masters.update(req.body,{
                where:{
                    id:key
                }
            })
            return commonResponse(res,200,[])
        }
        let isDuplicate = await db.tbl_brand_masters.findOne({
            where:{
                brand_name:req.body.brand_name
            },
            raw:true
        })
        if(isDuplicate!==null)
            return commonResponse(res,409,isDuplicate,[])

        const valid = validate(req.body)
        if(!valid)
            return commonResponse(res,400,[],validate.errors,"",environment)
        req.body.created_by = loginInfo.user_id || null
        let brandTblInsert = await db.tbl_brand_masters.create(req.body);
        if(brandTblInsert)
            return commonResponse(res,200,brandTblInsert)
    }catch(err){
        return commonResponse(res,500,[],err.message,"",environment)
    }
}

/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */
 const addCategory = async (req, res) =>{
    try{
        const headers = req.headers;
        const loginInfo = extractTokenInfo(res,headers)
        if(loginInfo===null){
            return commonResponse(res,400,[],[],"No user id found")
        }
        const validate = ajv.compile(categoryValidator)
        let key = req.body.key || null;
        delete req.body.key;
        if(key!==null){
            await db.tbl_category_masters.update(req.body,{
                where:{
                    id:key
                }
            })
            return commonResponse(res,200,[])
        }
        let isDuplicate = await db.tbl_category_masters.findOne({
            where:{
                category_name:req.body.category_name
            },
            raw:true
        })
        if(isDuplicate!==null)
            return commonResponse(res,409,isDuplicate,[])
            
        const valid = validate(req.body)
        if(!valid)
            return commonResponse(res,400,[],validate.errors,"",environment)
        req.body.created_by = loginInfo.user_id || null
        let categoryTblInsert = await db.tbl_category_masters.create(req.body);
        if(categoryTblInsert)
            return commonResponse(res,200,categoryTblInsert)
    }catch(err){
        return commonResponse(res,500,[],err.message,"",environment)
    }
}

/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */
const addColor = async (req, res) =>{
    try{
        const headers = req.headers;
        const loginInfo = extractTokenInfo(res,headers)
        if(loginInfo===null){
            return commonResponse(res,400,[],[],"No user id found")
        }
        const validate = ajv.compile(colorValidator)
        let key = req.body.key || null;
        delete req.body.key;
        if(key!==null){
            await db.tbl_color_masters.update(req.body,{
                where:{
                    id:key
                }
            })
            return commonResponse(res,200,[])
        }
        let isDuplicate = await db.tbl_color_masters.findOne({
            where:{
                color_name:req.body.color_name
            },
            raw:true
        })
        if(isDuplicate!==null)
            return commonResponse(res,409,isDuplicate,[])
        const valid = validate(req.body)
        if(!valid)
            return commonResponse(res,400,[],validate.errors,"",environment)
        req.body.created_by = loginInfo.user_id || null
        let colorTblInsert = await db.tbl_color_masters.create(req.body);
        if(colorTblInsert)
            return commonResponse(res,200,colorTblInsert)
    }catch(err){
        return commonResponse(res,500,[],err.message,"",environment)
    }
}

/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */
 const addSize = async (req, res) =>{
    try{
        const headers = req.headers;
        const loginInfo = extractTokenInfo(res,headers)
        if(loginInfo===null){
            return commonResponse(res,400,[],[],"No user id found")
        }
        const validate = ajv.compile(sizeValidator)
        let key = req.body.key || null;
        delete req.body.key;
        if(key!==null){
            await db.tbl_size_masters.update(req.body,{
                where:{
                    id:key
                }
            })
            return commonResponse(res,200,[])
        }
        let isDuplicate = await db.tbl_size_masters.findOne({
            where:{
                size_value:req.body.size_value
            },
            raw:true
        })
        if(isDuplicate!==null)
            return commonResponse(res,409,isDuplicate,[])

        const valid = validate(req.body)
        if(!valid)
            return commonResponse(res,400,[],validate.errors,"",environment)
        
        req.body.created_by = loginInfo.user_id || null
        let sizeTblInsert = await db.tbl_size_masters.create(req.body);
        if(sizeTblInsert)
            return commonResponse(res,200,sizeTblInsert)
    }catch(err){
        return commonResponse(res,500,[],err.message,"",environment)
    }
}

/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */
const getBrandList = async (req, res) => {
    try{
        let whereCondition = {};
        let brandId = req.params.brand_id || req.query.brand_id || null;
        let brandName = req.params.brand_name || req.query.brand_name || null;
        brandId !== null ? whereCondition.id = brandId : '';
        brandName !== null ? whereCondition.brand_name = brandName : '';
        const brandList = await db.tbl_brand_masters.findAll({
            attributes:[
                "id",
                "brand_code",
                "brand_name",
                "brand_desc",
                "brand_logo",
                "created_by"
            ],
            order:[['id','DESC']],
            where: whereCondition,
        })
        return commonResponse(res,200,brandList);
    }catch(err){
        return commonResponse(res,500,[],err.message,"",environment)
    }
}

/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */
 const getColorList = async (req, res) => {
    try{
        let whereCondition = {};
        let colorId = req.params.color_id || req.query.color_id || null;
        let colorName = req.params.color_name || req.query.color_name || null;
        colorId !== null ? whereCondition.id = colorId : '';
        colorName !== null ? whereCondition.color_name = colorName : '';
        const colorList = await db.tbl_color_masters.findAll({
            attributes:[
                "id",
                "color_name",
                "created_by"
            ],
            order:[['id','DESC']],
            where: whereCondition,
        })
        return commonResponse(res,200,colorList);
    }catch(err){
        return commonResponse(res,500,[],err.message,"",environment)
    }
}

/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */
 const getSizeList = async (req, res) => {
    try{
        let whereCondition = {};
        let sizeId = req.params.size_id || req.query.size_id || null;
        let sizeValue = req.params.size_value || req.query.size_value || null;
        sizeId !== null ? whereCondition.id = sizeId : '';
        sizeValue !== null ? whereCondition.size_value = sizeValue : '';
        const colorList = await db.tbl_size_masters.findAll({
            attributes:[
                "id",
                "size_value",
                "size",
                "created_by"
            ],
            order:[['id','DESC']],
            where: whereCondition,
        })
        return commonResponse(res,200,colorList);
    }catch(err){
        return commonResponse(res,500,[],err.message,"",environment)
    }
}

/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */
 const getCategoryList = async (req, res) => {
    try{
        let whereCondition = {};
        let id = req.params.id || req.query.id || null;
        let category_name = req.params.category_name || req.query.category_name || null;
        id !== null ? whereCondition.id = id : '';
        category_name !== null ? whereCondition.category_name = category_name : '';
        const categoryList = await db.tbl_category_masters.findAll({
            attributes:[
                "id",
                "category_name",
                "category_desc",
                "created_by"
            ],
            order:[['id','DESC']],
            where: whereCondition,
        })
        return commonResponse(res,200,categoryList);
    }catch(err){
        return commonResponse(res,500,[],err.message,"",environment)
    }
}


const productController = {
    addBrand,
    addSize,
    addColor,
    getBrandList,
    getColorList,
    getSizeList,
    addCategory,
    getCategoryList
}


module.exports = productController;