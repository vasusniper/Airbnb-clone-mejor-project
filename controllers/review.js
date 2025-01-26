const Listing = require("../models/listing.js");
const Review = require('../models/review.js');

// Add a review to a listing
module.exports.addReview = async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id; // Set the logged-in user as the author
    listing.reviews.push(newReview); // Add review to listing
    await listing.save();
    await newReview.save();
    req.flash("success", "Review successfully created");
    res.redirect(`/listings/${req.params.id}`);
}

// Delete a review from a listing
module.exports.deleteReview = async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); // Remove review from listing
    await Review.findByIdAndDelete(reviewId); // Delete the review
    req.flash("success", "Review successfully deleted");
    res.redirect(`/listings/${id}`);
}
