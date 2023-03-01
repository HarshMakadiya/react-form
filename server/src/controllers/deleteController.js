const Students = require("../models/student_modal.js");
const fs = require('fs')

const deleteStudents = async (req, res) => {
  
  try {
    const user = await Students.findOne({
      where: { id: req.params.id },
    });
    if (user) {
      if(user.image!==null){
        const path = `../client/public/Images/${user.image}`
        fs.unlinkSync(path, (err)=>{
          if(err){
            return;
          }
        })
      }
      await Students.destroy({
        where: {
          mail: user.mail,
        },
      });
      res.status(200).json("Successfully deleted");
    } else {
      res.status(400).json({ error: "User dosent exist" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = deleteStudents;