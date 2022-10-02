const commonResponse = (res,status,data=[],errors=[],msg='',env='production')=>{

    var jsonResponse = {};
    switch(status){
        case 200:
            jsonResponse={
                message: msg || 'Success',
                data:data,
                status:status
            };
            break;
        case 400:
            jsonResponse={
                message: msg || 'Bad Data Found',
                error: env === 'development' ? errors:[],
                status:status
            };
            break;
        case 500:
            jsonResponse={
                message: msg || 'Internal Server Error',
                error: env === 'development' ? errors:[],
                data:data,
                status:status
            };
            break;
        case 204:
            jsonResponse={
                message: msg || 'No Content Found',
                error: env === 'development' ? errors:[],
                data:data,
                status:status
            };
            break;
        case 404:
            jsonResponse={
                message: msg || 'Requested url / resource was not found',
                error: env === 'development' ? errors:[],
                data:data,
                status:status
            };
            break;
        case 409:
            jsonResponse={
                message: msg || 'Duplicate Record Found',
                error: env === 'development' ? errors:[],
                data:data,
                status:status
            };
            break;
        case 401:
            jsonResponse={
                message: msg || 'Unauthorized',
                error: env === 'development' ? errors:[],
                data:data,
                status:status
            };
            break;
        case 403:
            jsonResponse={
                message: msg || 'Forbidden',
                error: env === 'development' ? errors:[],
                data:data,
                status:status
            };
            break;
        case 503:
            jsonResponse={
                message: msg || 'Service Unavailable',
                error: env === 'development' ? errors:[],
                data:data,
                status:status
            };
            break;
        default:
            jsonResponse={
                message: msg || 'Something went wrong, HTTP Status Error ',
                error: env === 'development' ? errors:[],
                data:data,
                status:status
            };
            break;
    }
    return res.status(status).json(jsonResponse)
}

module.exports={
    commonResponse
}