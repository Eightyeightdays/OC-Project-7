require("dotenv").config({path: "../.env"});
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) =>{
    try{
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, process.env.SECRET_PHRASE);  // verifies that the token matches the secret phrase and returns the payload
        const userId = decodedToken.userId;
        req.auth = {userId};                    // add the decoded user ID to the request object 
        const adminStatus = decodedToken.admin;
        if(adminStatus === true){
            req.auth.admin = true;              // add admin status to req.auth for admin account
        }
        if(req.body.userId && req.body.userId !== userId){ //
            throw new Error("Invalid request");
        }else{
            next();
        }
    }catch{
        res.status(401).json({error: new Error("Invalid request")});
    }
}