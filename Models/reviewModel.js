const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reporter"
    },
    propId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Target"
    },
    description: {
        type: String,
        required: [true, 'You must provide the description']
    },
    date: {
        type: Date,
        default: Date.now()
    }
})



const Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;

