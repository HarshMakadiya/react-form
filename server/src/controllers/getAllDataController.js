const Students = require("../models/student_modal.js");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");


const getAllDataController = async(req, res)=>{
    const token = req.cookies;  
    if(!token){
        return res.status(400).json({error:"No cookie present"});
    }
    try {
        const data = jwt.verify(token.accessToken, process.env.JWT_SECRET);
        if(data){
            let searchQuery = req.query.search.toLowerCase();
            let isNumberpage = req.query.page ? parseInt(req.query.page) : 0;
            let isNumbersize = req.query.size ? parseInt(req.query.size) : 3;
            let page = 0;
            if(!Number.isNaN(isNumberpage) && req.query.page>0){
                page = parseInt(req.query.page);
            }
            let size = 3;
            if(!Number.isNaN(isNumbersize) && isNumbersize >0 && isNumbersize<3){
                size = isNumbersize;
            }
            let studentsData=[];
            if(searchQuery)
            {
                studentsData = await Students.findAndCountAll({
                    where:{
                        [Op.or]:[
                            {firstname : {[Op.like]: '%' + searchQuery + '%'}},
                            {lastname : {[Op.like]: '%' + searchQuery + '%'}},
                            {mail : {[Op.like]: '%' + searchQuery + '%'}},
                            {phoneno : {[Op.like]: '%' + searchQuery + '%'}},
                            {address1 : {[Op.like]: '%' + searchQuery + '%'}},
                            {address2 : {[Op.like]: '%' + searchQuery + '%'}},
                            {pincode : {[Op.like]: '%' + searchQuery + '%'}}
                        ]
                    },
                    limit: size,
                    offset: (page)*size
                });
            }else{
                studentsData = await Students.findAndCountAll({
                    limit: size,
                    offset: (page)*size
                });
            }
            res.status(200).send({studentsData: studentsData.rows, totalPages: Math.ceil(studentsData.count/size), totalStudents:studentsData.count});
        }else{
            return res.status(400).json("Not valid token")
        }
    } catch (error) {
        res.status(400).json(error);
    }
}
module.exports = getAllDataController;