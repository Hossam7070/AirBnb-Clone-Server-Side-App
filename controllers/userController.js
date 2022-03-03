const User = require('../Models/userModel');
const Prop = require('../Models/propertyModel')


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
exports.findMyProperties = async (req, res, next) => {
    //TODO : find all properties of certain user by user id 
    //AUTH : protect  
    try {
        const user = req.user;
        const myProps = await Prop.find().where("owner").equals(user._id);
        res.send(myProps);
    } catch (error) {
        error.statusCode = 500;
        next(error);
    }
}

exports.getMyDetails = async (req, res, next) => {
    //TODO: get user details by id 
    //AUTH : protect 
    try {
        res.send(req.user)
    } catch (error) {
        error.statusCode = 500;
        next(error);
    }
}