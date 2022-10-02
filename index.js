const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const routes = require("./src/router");
const app = express();
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
const { verifyToken } = require("./src/middleware/verifyToken");
const env = process.env.ENVIRONMENT || "development";
const config = require(__dirname+"/src/config/config.json")[env]

app.use(cors({
    origin: 'http://localhost/'
}));

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/',(req,res)=>{
    res.send("welcome to branded vastra");
})
app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"./tmp",
    })
)

/** Routes */
app.use(config.API_PREFIX,routes)

const port = process.env.PORT || 7007
app.listen(port,()=>{
    console.log("API service is running")
})