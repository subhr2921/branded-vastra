const jwt = require('jsonwebtoken')
const jwt_decode = require('jwt-decode')
const commonResponse = require('../helpers/commonResponse')
const env = process.env.ENVIRONMENT || 'development'
const config = require(__dirname+"/../config/config.json")[env]

const verifyToken = (req,res,next) => {
    if(req.headers["authorization"]===undefined)
        return commonResponse(res,400,[],[],"Token is required")

    try{
        const token = req.headers["authorization"].split(" ")[1] || "";
        const {exp} = jwt_decode(token);
        if(Date.now()>= exp*1000){
            return commonResponse(res,401,[],[],"Your token is expired")
        }
        jwt.verify(token, config.SECRET_KEY,(err, user)=>{
            if(err)
                return commonResponse(res,403,[],[],"Invalid token")
            
            req.user = user;
            return next();
        })
    }catch(err){
        return commonResponse(res,500,[],err.message,"",env)
    }
}

module.exports =  { verifyToken }