const {sign, verify} = require("jsonwebtoken");

const createTokens = (user)=>{
    const accessToken = sign({id: user.id, mail: user.mail, isAdmin: user.isAdmin}, process.env.JWT_SECRET, {
        expiresIn: 3000
    })
    return accessToken;
}
const validateToken = (req, res, next)=>{
    const accessToken = req.cookies["accessToken"];
    if(!accessToken){
        return res.status(400).json({error: "User not Authenticated!"});
    }
    try {
        const validToken = verify(accessToken,process.env.JWT_SECRET);
        if(validToken){
            req.authenticated = true;
            return next();
        }
    } catch (error) {
        res.status(400).json({error: error});
    }
}

const validateAdminToken = (req, res, next)=>{
    console.log("Admin middleware")
    const accessToken = req.cookies["accessToken"];
    if(!accessToken){
        return res.status(400).json({error: "User not Authenticated!"});
    }
    try {
        const validToken = verify(accessToken,process.env.JWT_SECRET);
        if(validToken.isAdmin){
            req.authenticated = true;
            return next();
        }else{
            res.error(400).json({error:"Only admin can see this page"});
        }
    } catch (error) {
        res.status(400).json({error: "Only admin can see this page"});
    }
}
module.exports = {createTokens, validateToken, validateAdminToken}