const jwt = require("jsonwebtoken");

module.exports = (req, res, next) =>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, "SECRET_PHRASE");
        const userId = decodedToken.userId;
        req.auth = {userId};                    // add the decoded user ID to the request object (req.auth.id)

        if(req.body.id && req.body.id !== id){
            throw "Invalid ID"
        }else{
            next();
        }
    }catch{
        res.status(401).json({error: new Error("Invalid request")});
    }
}