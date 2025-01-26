const express=require('express');
const router=express.Router();
const Listing = require("../models/listing");
// Search functionality for listings
router.route("/").get(async (req, res, next) => {
    let { keyword } = req.query;

    try {
        if (!keyword) {
            const exError = new ExpressError("Keyword is required for search", 400);
            next(exError);
            return;
        }
        // Search Listings based on title or description
        let searchInfo = await Listing.find({
            $or: [
                { title: { $regex: keyword, $options: "i" } }, // Case-insensitive search for title
                { description: { $regex: keyword, $options: "i" } }
            ]
        }).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");

        if (!searchInfo || searchInfo.length === 0) {
            req.flash("error", "Listing not found");
            return res.redirect("/listings");
        }

        // Render search results page
        res.render("listings/searchData.ejs", { searchInfo });
    } catch (error) {
        next(error);
    }
});
module.exports=router;