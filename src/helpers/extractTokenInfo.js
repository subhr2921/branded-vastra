const jwt = require('jsonwebtoken')

const extractTokenInfo = (req,headers) => {
    if(headers["authorization"]===undefined)
        return {
            status:401
        }

    const token = headers["authorization"].split(" ")[1] || "";
    const result = jwt.decode(token);
    if(!result){
        return {
            status:401
        }
    }
    return result;
}

module.exports = {
    extractTokenInfo
}