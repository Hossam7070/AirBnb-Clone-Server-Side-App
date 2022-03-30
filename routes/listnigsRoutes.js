const listCtrl = require('../controllers/listingController')
const auth = require('../controllers/authController')
const express = require('express')
const router = express.Router();

router.route('/').post(
    auth.protect,
    listCtrl.createListing
).get(
    listCtrl.getAllListings
)
router.route('/:id').patch(
    auth.protect,
    listCtrl.editListing
).get(
    listCtrl.getListingById
).delete(
    listCtrl.deleteListing
)
router.route('/host/:id').get(
    listCtrl.getListingsByhost
)
module.exports = router;
