const express = require("express");
const router = express.Router();
const propControll = require("../controllers/propertyController")



router
.route('/')
.post(propControll.createNewProperty)// API:01 create new property 

module.exports =router;