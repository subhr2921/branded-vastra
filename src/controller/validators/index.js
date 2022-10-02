const loginUserValidator = {
    type:"object",
    properties:{
        mobile_number:{type:"number"},
        password:{type:"string"}
    },
    required:["mobile_number","password"],
    additionalProperties:false
}

const productValidator = {
    type:"object",
    properties:{
        unique_no:{type:"string"},
        brand_id:{type:"number"},
        category_id:{type:"number"},
        product_name:{type:"string"},
        description:{type:"string"},
        mrp:{type:"string"},
        discount:{type:"string"},
        price:{type:"string"},
        size_id:{type:"number"},
        color_id:{type:"number"},
        quantity:{type:"number"},
        sold:{type:"number"},
        defective:{type:"number"},
        available:{type:"number"},
    },
    required:["unique_no","product_name","mrp","price","quantity","category_id"],
    additionalProperties:false
}

const brandValidator = {
    type:"object",
    properties:{
        brand_code:{type:"string"},
        brand_name:{type:"string"},
        brand_desc:{type:"string"},
        brand_logo:{type:"string"}
    },
    required:["brand_name"],
    additionalProperties:false
}

const categoryValidator = {
    type:"object",
    properties:{
        category_name:{type:"string"},
        category_desc:{type:"string"},
    },
    required:["category_name"],
    additionalProperties:false
}

const colorValidator = {
    type:"object",
    properties:{
        color_name:{type:"string"}
    },
    required:["color_name"],
    additionalProperties:false
}

const sizeValidator = {
    type:"object",
    properties:{
        size:{type:"string"},
        size_value:{type:"string"},
    },
    required:["size_value"],
    additionalProperties:false
}

const userValidator = {
    type:"object",
    properties:{
        first_name:{type:"string"},
        last_name:{type:"string"},
        username:{type:"string"},
        email:{type:"string"},
        password:{type:"string"},
        mobile_number:{type:"string"},
        gender:{type:"number"},
        role_id:{type:"number"},
        status:{type:"number"},
    },
    required:["first_name","last_name","username","password","mobile_number"],
    additionalProperties:false
}
const createSaleValidator ={
    type:"object",
    properties:{
        name:{type:"string"},
        address:{type:"string"},
        mobile_no:{type:"string"},
        total_amount:{type:"string"},
        gst_amount:{type:"string"}
    },
    required:["mobile_no","total_amount","gst_amount"],
    additionalProperties:false
}

module.exports = {
    loginUserValidator,
    productValidator,
    sizeValidator,
    colorValidator,
    brandValidator,
    userValidator,
    categoryValidator,
    createSaleValidator
}