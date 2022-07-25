const multer = require("multer");

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/gif") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Images must be in jpg, png or gif format"));
    }
};

const storage = multer.diskStorage({
    destination: (req, file, callback) =>{      
        callback(null, "images");               // save to a local folder called "images"
    },
    filename: (req, file, callback) =>{
        const name = file.originalname.split(" ").join("_");
        callback(null, Date.now() + "_" + name);     
    }
});

module.exports = multer({storage: storage, fileFilter: fileFilter}).single("image");