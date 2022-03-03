const util = require('util');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../Models/userModel');
const bcrypt = require('bcrypt');

const asyncTokenVerification = util.promisify(jwt.verify);
const asyncTokenSign = util.promisify(jwt.sign);


exports.protect = async (req, res, next) => {
    const { authorization } = req.headers;
    
    try {
        const payload = await asyncTokenVerification(authorization, process.env.SECRET_KEY);
        
        const user = await User.findById(payload.id)
        req.user = user;
        
        
    } catch (error) {
        error.message = "unauthorized";
        error.statusCode = 403;
        next(error);
    }
    next();
}

exports.login = async (req,res,next)=>{
    const { username, password } = req.body;
    // console.log(username);
    try {
        
        const user  = await User.findOne({ username});
        // console.log(user.username);
        if(!user)throw new Error('invalid username or password');
        const {password: hashedPassword} = user;

        const result = await bcrypt.compare(password, hashedPassword);

        if(!result) throw new Error('invalid username or password222');
        const token = await asyncTokenSign({
        id: user._id
        },
        process.env.SECRET_KEY);
        
    res.send({token});
    } 
    catch (error) {
        console.log(error);
        next(error);
    }
}

