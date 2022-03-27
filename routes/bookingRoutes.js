const express = require("express");
const router = express.Router();
const book = require("../controllers/bookingContoller");

router.route("/")
    .post(
        book.createBooking
    )
    .get(
        book.getAllBooknings
    )
router.route("/host/:id")
    .get(
        book.getBookningsByHost
    )
router.route("/list/:id")
    .get(
        book.getBookningsByProp
    )

router.route('/update-booking/:id')
    .patch(
        book.updateBooking
    )

module.exports = router;