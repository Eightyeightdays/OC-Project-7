require("dotenv").config({path: "../.env"});
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) =>{
    try{
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, process.env.SECRET_PHRASE);
        const userId = decodedToken.userId;
        req.auth = {userId};                    // add the decoded user ID to the request object // COULD MAYBE SHORTEN TO req.userId

        if(req.body.userId && req.body.userId !== userId){ //
            throw new Error("Invalid request");
        }else{
            next();
        }
    }catch{
        res.status(401).json({error: new Error("Invalid request")});
    }
}