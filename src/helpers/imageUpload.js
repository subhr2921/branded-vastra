const path =require("path");
const env = process.env.ENVIRONMENT || "development";
const config = require(__dirname+"/../config/config.json")[env]

const uploadImage = async (req, postName, location) =>{
    let filename = "";
    if (req.files[postName].size > 0) {
        filename = `bv-${Date.now()}_${req.files[postName].name}`;
        let newPath = path.join(process.cwd(), `${config.IMG_UPLOAD_URL}`, filename);
        req.files[postName].mv(newPath);
    }
    return filename
}

module.exports = {
    uploadImage
}