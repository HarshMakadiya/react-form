const Students = require("../models/student_modal.js");
const jwt = require("jsonwebtoken");

const getDataController = async(req, res)=>{
    const token = req.cookies;  
    if(!token){
        return res.status(403).json({error:"No cookie present"});
    }
    try {
        const data = jwt.verify(token.accessToken, process.env.JWT_SECRET);
        if(data){
            const studentsData = await Students.findOne({where:{id: data.id}});
            res.status(200).json(studentsData);
        }else{
            return res.status(400).json("Not valid token")
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

module.exports = getDataController;