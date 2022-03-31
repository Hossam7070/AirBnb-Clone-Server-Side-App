const express = require("express");
const router = express.Router();
const review = require("../controllers/reviewController");



// create review
router.route("/")
    .post(
        review.createReview
    )
    .get(
        review.getAllReviews
    )

//git all sended review  => userId
router.route("/user/:Id")
    .get(
        review.getAllReviewsCreatedByUser
    )

//git all received review => propId
router.route("/prop/:Id")
    .get(
        review.getAllPropReviews
    )

//git prop rate
router.route("/prop/rate/:Id")
    .get(
        review.propRate
    )


module.exports = router;