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
router.route('/:id')
.get(
    book.approveRequest
)
router.route('/my-bookings/:id')
.get(
    book.getMyReservations
)
.post(
    book.cancelMyBooking
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

router.route('/update-booking/:id')
    .patch(
        book.updateBooking
    )

module.exports = router;
