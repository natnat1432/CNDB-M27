const fs = require("fs");
const multer = require("multer");
require("dotenv").config()

const storage = multer.diskStorage({
    destination: (_req, file, cb) => {
        console.log(file.originalname);
        const dir = process.env.UPLOAD_PATH;

        if(fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive:true })
        }
        cb(null,dir);
    },
    filename:(_req, file, cb) => {
        console.log(file.originalname);
        cb(null,`${Date.now()}-${file.originalname}`);
    },
});

const csvFilter = (_req, file, cb) => {
    console.log('Reading file in middleware', file.originalname);
    if(file === undefined)
    {
        cb('Please upload a csv file to proceed', false);
    }
    else if(file.mimetype.includes('csv')){
        cb(null, true);
    }
    else{
        cb('CSV only supported', false);
    }
};


module.exports = multer({
    storage:storage,
    fileFilter:csvFilter
})