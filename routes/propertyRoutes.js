const express = require("express");
const router = express.Router();
const propControll = require("../controllers/propertyController")
const auth = require('../controllers/authController');
const userCtl = require('../controllers/userController');


router
.route('/')
.post(
    auth.protect,
    propControll.uploadTourImages,
    propControll.createNewProperty
    )// API:P01 create new property 
.get(
    propControll.getAllProperties
    // API:P02 get all properties
)

router.route('/:id')
.patch(
    propControll.editMyProp
)
.delete(
    propControll.deleteMyProp
)
module.exports =router;