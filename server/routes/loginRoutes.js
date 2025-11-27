const express = require("express");
const router = express.Router();
const Logins = require("../models/login");
const { loginUser,addlogin} = require("../controllers/logincontroller");


router.post("/addlogin", addlogin) ;
router.post("/login", loginUser);
  module.exports = router;
