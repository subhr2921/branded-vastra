const db = require("../models");
const jwt = require('jsonwebtoken');
const Ajv = require("ajv");
const { loginUserValidator } = require("./validators");
const { commonResponse } = require("../helpers/commonResponse");
const environment = process.env.ENVIRONMENT || "development"
const config = require(__dirname+"/../config/config.json")[environment]


const ajv = new Ajv();


const userLogin = async (req,res) =>{
    try{
        const validate = ajv.compile(loginUserValidator)
        const valid = validate({mobile_number:Number(req.body.mobile_number),password:req.body.password})
        if(!valid)
            return commonResponse(res,400,[],validate.errors,"",environment)
        
        let user = await db.tbl_user_masters.findOne({
            where:{mobile_number:req.body.mobile_number,password:req.body.password},
            attributes:[
                'id',
                'first_name',
                'last_name',
                'username',
                'email',
                'mobile_number',
                'role_id',
                'password'
            ]
        })
        if(!user || user===null)
            return commonResponse(res,400,[],[],"Invalid Login Credentials",environment)
        
        const token = generateAccessToken({name:user.last_name,username:user.username,user_id:user.id});
        let userInfo = {
            email:user.email,
            first_name:user.first_name,
            last_name:user.last_name,
            username:user.username,
            mobile_number:user.mobile_number,
            role_id:user.role_id,
            token:token
        }
        return commonResponse(res,200,userInfo);
    }catch(err){
        return commonResponse(res,500,[],err.message,"",environment)
    }
}

const generateAccessToken = (payload) =>{
    return jwt.sign(payload,config.SECRET_KEY,{expiresIn:config.USER_TOKEN_EXPIRY_TIME})
}

const authController = {
    userLogin
}
module.exports = authController;