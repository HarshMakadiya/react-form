const Students = require("../models/student_modal.js");

const logoutStudent = async (req, res)=>{
    
    const {id} = req.body;
    try {
        const user = Students.findOne({where:{id:id}});
        if(user){
            res.cookie('accessToken', '', { expires: new Date(0), httpOnly: true });
            res.status(200).json("Logged out");
        }else{
            res.status(400).json({error: "User doesn't exist"})
        }
    } catch (error) {
        res.json(error);
    }
}

module.exports = logoutStudent;