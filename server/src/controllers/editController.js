const Students = require("../models/student_modal.js");
const bcrypt = require("bcryptjs");

const editStudents = async (req, res) => {
  const {
    firstname,
    lastname,
    phoneno,
    address1,
    address2,
    pincode,
  } = req.body;
  const image = req?.file?.filename;
  // const image = req.file.filename;
  try {
    console.log(firstname);
    if (firstname === "") {
      res.status(400).json({error:"Please enter first name"});
    } else if (lastname === "") {
      res.status(400).json({error:"Please enter last name"});
    } else if (address1 === "") {
      res.status(400).json({error:"Please enter address1"});
    } else if (phoneno.length < 10 || isNaN(phoneno)) {
      res.status(400).json({error:"Please enter valid phonenumber!"});
    }else if (pincode.length < 6 || isNaN(pincode)) {
      res.status(400).json({error:"Please enter valid pincode!"});
    }
    const user = await Students.findOne({
      where: { id: req.params.id },
    });
    if (user) {
      user.firstname = firstname;
      user.lastname = lastname;
      user.phoneno = phoneno;
      user.address1= address1;
      user.address2 = address2;
      user.pincode = pincode;
      user.image = image;
      await user.save();
      res.status(200).json("Data successfully updated!");
    } else {
      res.status(400).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = editStudents;