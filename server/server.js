require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const studentRoutes = require("./src/routes/student_routes.js");
const cookieParser = require("cookie-parser");
const path = require("path")
require("./src/models/index.js");
require("./src/models/student_modal.js");


app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
app.use(cors({
  origin:'http://localhost:3000',
  credentials: true,
  optionSuccessStatus:200
}));



app.get("/", (req, res) => {
  res.json({ message: "CONNECTED" });
});

app.use("/user", studentRoutes);
app.use("client/public/Images", express.static(path.join(path.resolve(),"client/public/Images")))
console.log(path.join(path.resolve()));

app.listen(process.env.PORT_NO || 5000, () => {
  console.log(`Server started on 5000`);
});
