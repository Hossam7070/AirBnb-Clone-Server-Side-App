const User = require('../Models/userModel');



exports.registerUser = async (req, res, next) => {
    try {
        const {
            photo,
            firstName,
            lastName,
            city,
            postalCode,
            address,
            about,
            password,
            email,
            username
        } = req.body;
        const user = new User({
            photo,
            firstName,
            lastName,
            city,
            postalCode,
            address,
            about,
            password,
            email,
            username
        });
        const newUser = await user.save();
        res.send(newUser);
    } catch (error) {
        error.statusCode = 500;
        next(error);
    }
}
exports.findMyProperties = async (req, res, next)=>{
    //TODO : find all properties of certain user by user id 
    //AUTH : protect  
}

exports.getMyDetails = async (req, res, next)=>{
    //TODO: get user details by id 
    //AUTH : protect 
}