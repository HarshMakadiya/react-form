const bcrypt = require("bcryptjs");
const { verify } = require("jsonwebtoken");
const Students = require("../models/student_modal.js");
function passwordValidate(p) {
  const re = RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/
  );
  if (re.test(p)) {
    return true;
  }
}
function hashPassword(password) {
  var salt = bcrypt.genSaltSync(JSON.parse(process.env.HASH_SALT));
  var hash = bcrypt.hashSync(password, salt);
  return hash;
}

const passwordChangeStudent = async (req, res) => {
  console.log(req.body);
  const { password } = req.body;
  const id = +req.params.id;
  const accessToken = req.cookies["accessToken"];
  if (!accessToken) {
    res.status(400).json({ error: "User not Authenticated!" });
  }
  if (!passwordValidate(password)) {
    res.status(400).json({
      error: "Enter password with min length 6, containing A,a,# or @, 0-9",
    });
  }
  try {
    const validToken = verify(accessToken, process.env.JWT_SECRET);
    console.log(id, "asfsd", validToken.id);
    if (validToken.id === id) {
      const user = await Students.findOne({ where: { id: id } });
      if (user) {
          const hash = hashPassword(password);
          user.password = hash;
          await user.save();
          res.status(200).json("Password updated successsfully");
      } else {
        res.status(400).json({ error: "User doesn't exist" });
      }
    } else {
      res
        .status(400)
        .json({ error: "User cannot enter another users password!!!" });
    }
  } catch (error) {
    console.log("ERROR")
    res.status(400).json({ error: error });
  }
};
module.exports = passwordChangeStudent;
