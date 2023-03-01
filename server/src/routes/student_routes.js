const express = require("express");
const registerController = require("../controllers/registerController.js")
const loginController = require("../controllers/loginController.js");
const router = express.Router();
const {validateToken, validateAdminToken} = require("../jwt/jwttoken.js");
const editController = require("../controllers/editController.js");
const deleteController = require("../controllers/deleteController.js");
const getDataController = require("../controllers/getDataController.js");
const logoutController = require("../controllers/logoutController.js");
const getAllDataController = require("../controllers/getAllDataController.js");
const passwordChangeController = require("../controllers/passwordController.js");
const upload = require("../controllers/imageUploadController.js");

router.post("/register",upload ,registerController);
router.delete("/delete/:id", validateAdminToken,deleteController);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.put("/edit/:id",upload ,validateToken, editController);
router.put("/editPassword/:id", validateToken, passwordChangeController);
router.get("/data", validateToken,getDataController);
router.get("/alldata", validateAdminToken,getAllDataController);


module.exports = router;