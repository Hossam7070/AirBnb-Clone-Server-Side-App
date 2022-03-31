const Review = require("../Models/reviewModel");

exports.createReview = async (req, res, next) => {
    const { userId, propId, description, rate } = req.body;
    const newReview = new Review({ userId, propId, description, rate });
    try {
        const savedReview = await newReview.save();
        res.send(savedReview);
    } catch (err) {
        next(err);
    }
};


exports.getAllReviewsCreatedByUser = async (req, res, next) => {
    try {
        const userReviews = await Review.find({ userId: req.params.Id });
        res.send(userReviews);
    } catch (err) {
        next(err);
    }
};

exports.getAllPropReviews = async (req, res, next) => {
    try {
        const propReviews = await Review.find({ propId: req.params.Id });
        res.send(propReviews);
    } catch (err) {
        next(err);
    }
};

//getAllReviews
exports.getAllReviews = async (req, res, next) => {
    try {
        const allReviews = await Review.find();
        res.send(allReviews);
    } catch (err) {
        next(err);
    }
};

exports.propRate = async (req, res, next) => {
    try {
        const propReviews = await Review.find({ propId: req.params.Id });
        const propRates = propReviews.reduce((acc, curr) => {
            return acc + curr.rate;
        }, 0);
        const rate = propRates / propReviews.length || 1;
        res.json(rate);

    } catch (err) {
        next(err);
    }
};

