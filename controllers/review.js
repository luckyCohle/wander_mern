const Review = require("../models/review")
const Listing = require("../models/listing")

module.exports.createReview = async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review); // Corrected model name
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    console.log("Review saved");
    console.log(req.params)
    req.flash("success","reveiw added!");
    res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async (req, res) => {
    let { id, reviewId } = req.params;
    console.log("Delete request received")
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId); // Corrected method name
    req.flash("success","review delelted!");
    res.redirect(`/listings/${id}`);
};