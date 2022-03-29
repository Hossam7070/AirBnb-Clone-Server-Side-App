const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
/**
 * {photo ,firstName ,lastName,city,postalCode,address,about,password,email,username}
 */
const userSchema = new mongoose.Schema({
    photo: {
        type: String,
        default: 'default.jpg'
    },
    firstName : {
        type: String
        ,required : [true,'please provide a First name']
    },
    lastName : {
        type: String
        ,required : [true,'please provide a Last name']
    },
    city : {
        type: String
        ,required : [true,'please provide a city']
    },
    postalCode : {
        type: Number
        ,required : [true,'please provide postal code number']
    },
    address : {
        type: String
        ,required : [true,'please provide an address']
    },
    about : {
        type: String
        ,required : [true,'please provide a description']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
    }, 
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    username: {
        type: String,
        required: [true, 'Please provide your username'],
        unique: true,
    },
    role: {
        type: String,
        enum: ['user','admin','host'],
        default: 'user'
    }
})
userSchema.pre('save', async function(next) {
    const saltRounds = 10;
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;

