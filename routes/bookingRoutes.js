const express = require("express");
const router = express.Router();
const book = require("../controllers/bookingContoller");

router.route("/")
.post(
    book.handleConflict,
    book.createBooking
)
.get(
    book.getAllBooknings
)
router.route("/host/:id")
.get(
    book.getMyCurruntBookings
)
.post(
    book.getBookningsByHost
)
router.route("/list/:id")
.get(
    book.getBookningsByProp
)
.patch(
    book.approveRequest
)
.post(
    book.cancelMyBooking
)

module.exports =router;