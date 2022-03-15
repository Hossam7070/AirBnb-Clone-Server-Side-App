const express = require("express");
const router = express.Router();
const propControll = require("../controllers/propertyController")
const auth = require('../controllers/authController');
const userCtl = require('../controllers/userController');


router
.route('/')
.post(
    auth.protect,
    propControll.createNewProperty
    )// API:01 create new property 
.get(
    propControll.getAllProperties
)
module.exports =router;