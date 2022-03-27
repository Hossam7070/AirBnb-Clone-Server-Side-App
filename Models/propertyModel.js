const mongoose = require('mongoose')
// {title,description,long,lat,country,city,address,pricePN,avgRating,nRatings,owner,
//  imageCover , images ,amienties ,properties }
// 
const PropertySchema = new mongoose.Schema({
    title: {
        type: String
        , required: [true, 'please provide proprty title']
    },
    description: {
        type: String,
        required: [true, 'please provide proprty description']
    },
    location: {
        long: String,
        lat: String,
        country: String,
        city: String,
        address: String,
    },
    pricePN: {
        type: Number,
        required: [true, 'please provide price per night']
    },
    avgRating: {
        type: Number,
        default: 4.5,
    },
    nRatings: {
        type: Number,
        default: 0
    },
    priority:{
        type: Number,
        max: 100,
        min: 0,
        default:50,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // 
    },
    imageCover: {
        type: String,
        required: [true, 'A property must have a cover image']
    },
    createdAt:{
        type: Date,
        default:Date.now()
    },
    images: [String],
    amienties: [String],
    properties: [String]  //for now it will be objId later 
})



const Property = mongoose.model('Property', PropertySchema);
module.exports = Property;

