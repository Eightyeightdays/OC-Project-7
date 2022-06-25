const multer = require("multer");

// C:\Users\Utilisateur\Desktop\groupomania

const MIME_TYPES = {
    "Image/jpg": "jpg",
    "Image/jpeg": "jpg",
    "Image/png": "png"
};

const storage = multer.diskStorage({
    destination: (req, file, callback) =>{      // try adding destination only
        callback(null, "images");
    },
    filename: (req, file, callback) =>{
        const name = file.originalname.split(" ").join("_");
        const extension = MIME_TYPES[file.mimetype];
        callback(null, req.auth.userId + name + extension);     // CHECK IN CASE OF ERROR
    }
});

module.exports = multer({storage: storage}).single("image");