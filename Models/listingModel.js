const mongoose = require('mongoose')
const listingSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    city: {
        type: String
    },
    neighbourhood_cleansed: {
        type: String
    },
    number_of_reviews: {
        type: Number
    },
    summary: {
        type: String
    },
    bedrooms: {
        type: Number
    },
    bathrooms: {
        type: Number
    },
    guests_included: {
        type: Number
    },
    price: {
        type: Number
    },
    host_name: {
        type: String
    },
    host_thumbnail_url: {
        type: String
    },
    amenities: {
        type: [String]
    },
    xl_picture_url: [String],
    description: {
        type: String
    },
    cancellation_policy: {
        type: String
    },
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    geo_location: [],
    property_type: {
        type: String
    }


})
module.exports = mongoose.model("Listing", listingSchema);