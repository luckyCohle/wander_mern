const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const{validateReview, isLoggedIn,isAuthor}= require("../middleware.js");
const reviewController = require("../controllers/review.js");


// Post review
router.post("/", validateReview,isLoggedIn, wrapAsync(reviewController.createReview))

// Delete Route 
router.delete("/:reviewId",isLoggedIn,isAuthor, wrapAsync(reviewController.destroyReview))

module.exports = router; // Export the router instead of review
