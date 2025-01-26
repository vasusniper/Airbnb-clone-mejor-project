const Listing = require("./models/listing");
const Review = require("./models/review.js");
const { listingSchema, reviewSchema } = require("./schemasValidate.js");
const ExpressError = require('./utils/expressError.js');

// Middleware to check if the user is logged in
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "you must be login");
        return res.redirect("/login");
    }
    next();
}

// Middleware to store redirect URL
module.exports.saveredirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

// Middleware to check if the user is the owner of the listing
module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    try {
        let listings = await Listing.findById(id);
        if (!listings) {
            req.flash("error", "Listing not found");
            return res.redirect("/listings");
        }
        if (!listings.owner._id.equals(res.locals.currUser._id)) {
            req.flash("error", "You don't have permission to edit");
            return res.redirect(`/listings/${id}`);
        }
        next();
    } catch (error) {
        req.flash("error", "An error occurred while fetching the listing");
        throw new ExpressError(error);
    }
};

// Middleware for backend validation of listing data
module.exports.listingValidate = async (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(',');
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

// Middleware for backend validation of review data
module.exports.reviewValidate = async (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(',');
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

// Middleware to check if the current user is the owner of the review
module.exports.isReviewOwner = async (req, res, next) => {
    try {
        let { id, reviewId } = req.params;
        let review = await Review.findById(reviewId);

        if (!review) {
            req.flash("error", "Review not found");
            return res.redirect(`/listings/${id}`);
        }

        if (!review.author._id.equals(res.locals.currUser._id)) {
            req.flash("error", "You are not the author of this review");
            return res.redirect(`/listings/${id}`);
        }

        next();
    } catch (error) {
        console.error(error); // Logging error for debugging
        throw new ExpressError("An error occurred while processing your request", 500);
    }
};