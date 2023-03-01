const bcrypt = require("bcryptjs");

const Students = require("../models/student_modal.js");

function hashPassword(password) {
  var salt = bcrypt.genSaltSync(JSON.parse(process.env.HASH_SALT));
  var hash = bcrypt.hashSync(password, salt);
  return hash;
}

function isValidEmail(email) {
  const re = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
  if (re.test(email)) {
    return true;
  }
}
function passwordValidate(p) {
  const re = RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/
  );
  if (re.test(p)) {
    return true;
  }
}

const addStudent = async (req, res) => {
  const {
    firstname,
    lastname,
    mail,
    phoneno,
    address1,
    address2,
    pincode,
    password,
  } = req.body;
  const image = req?.file?.filename;
  console.log(image);
  if (firstname === "") {
    res.status(400).json({ error: "Please enter first name" });
  } else if (lastname === "") {
    res.status(400).json({ error: "Please enter last name" });
  } else if (address1 === "") {
    res.status(400).json({ error: "Please enter address1" });
  } else if (password === "") {
    res.status(400).json({ error: "Please enter password" });
  } else if (phoneno.length != 10 || isNaN(phoneno)) {
    res.status(400).json({ error: "Please enter valid phonenumber!" });
  } else if (pincode.length != 6 || isNaN(pincode)) {
    res.status(400).json({ error: "Please enter valid pincode!" });
  } else if (!passwordValidate(password)) {
    res
      .status(400)
      .json({
        error: "Enter password with min length 6, containing A,a,# or @, 0-9",
      });
  } else if (!isValidEmail(mail)) {
    res.status(400).json({ error: "Enter valid email" });
  }
  try {
    const userExist = await Students.findOne({ where: { mail } });
    if (userExist) {
      res.status(400).json({ error: "User already exists" });
    } else {
      const hash = hashPassword(password);
      try {
        const user = await Students.create({
          firstname,
          lastname,
          mail,
          phoneno,
          address1,
          address2,
          pincode,
          password: hash,
          image
        });
        res.status(200).json({
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          phoneno: user.phoneno,
          mail: user.mail,
          password: user.password,
          address1: user.address1,
          address2: user.address2,
          pincode: user.pincode,
          isAdmin: user.isAdmin,
          image: user.image
        });
        console.log("Registered");
      } catch {
        res.status(400).json({ error: "Cannot add user" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = addStudent;
