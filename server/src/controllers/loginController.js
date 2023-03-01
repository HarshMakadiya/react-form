const bcrypt = require("bcryptjs");
const Students = require("../models/student_modal.js");
const cookieParser = require('cookie-parser');
const {createTokens} = require("../jwt/jwttoken.js");

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

const loginStudent = async (req, res) => {
  const { mail, password } = req.body;
  if (!isValidEmail(mail)) {
    res.status(400).json({error:"Enter valid email"});
  } else if (!passwordValidate(password)) {
    res.status(400).json({error:
      "Enter password with min length 6, containing A,a,# or @, 0-9"
    });
  }
  try {
      const user = await Students.findOne({where:{mail:mail}});
        if(user){
            const dbPassword = user.password;
            const match = bcrypt.compareSync(password, dbPassword);
            if(!match){
                res.status(400).json({error: "Wrong username and password combination!!"})
            }else{
                const accessToken = createTokens(user);
                res.cookie("accessToken", accessToken, {
                    maxAge: 60*60*24*1000*5,
                    httpOnly: true
                })
                
                res.status(200).json(user);
            }
        }else{
            res.status(400).json({error: "User doesn't exist"})
        }
  } catch (error) {
    res.send({error: "Cannot login user"});
  }
   
};
module.exports = loginStudent;
