const express = require('express')
const router = express.Router();
const auth = require('../controllers/authController');
const userCtl = require('../controllers/userController');

router
.route('/sign-up')
.post(userCtl.registerUser)

router
.route('/login')
.post(
    auth.login
)





module.exports = router ;