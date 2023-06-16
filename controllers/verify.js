const jwt = require("jsonwebtoken");


//verifying jwt token
const verifyToken = (req, res, next)=>{

    const authHeader = req.headers.token
    if(authHeader){

        jwt.verify(token, process.env.JWT_SEC, (err, user)=>{
             if(err) res.status.json("token is not valid");
             next(); 
        });
        
    } else {
        return res.status(401).send("you are not authenticated");
    }
}


