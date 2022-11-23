const jwt = require('jsonwebtoken');
const config = require("../config.json")
 
function authMember(req,res,next)
{
    try {
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, config.secret);
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
     next();
    } catch(error) {
        res.status(401).json({ err: "Unauthorized" });
    }
}

function authAdmin(req,res,next) {
    try {
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
        
        next();
    } catch(error) {
        res.status(401).json({ err: "Unauthorized" });
    }
};

module.exports = {authMember, authAdmin}

