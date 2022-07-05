const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, callback) =>{      // try adding destination only
        callback(null, "images");               // save to a folder called "images"
    },
    filename: (req, file, callback) =>{
        const name = file.originalname.split(" ").join("_");
        callback(null, req.auth.userId + name);     // CHECK IN CASE OF ERROR // replace userId with postId to make each image unique
    }
});

module.exports = multer({storage: storage}).single("image");