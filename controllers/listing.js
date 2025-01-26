const Listing = require("../models/listing");

// Display all listings on the index page
module.exports.index = async (req, res) => {
    let listings = await Listing.find({});
    res.render("listings/index.ejs", { listings });
}

// Display the "Add New Listing" page
module.exports.addNewpage = (req, res) => {
    res.render("listings/addNew.ejs");
}

// Handle the creation of a new listing
module.exports.createList = async (req, res) => {
    let newlisting = new Listing(req.body.listing);
    let { category } = req.body.listing;
    
    const validCategories = ["Trending", "Rooms", "Castle", "Amazing pools", "Camping", "Treehouse", "Mountain", "Beach", "Luxury Stay", "Cave", "Desert"];
    if (!validCategories.includes(category)) {
        req.flash("error", "Invalid category selected.");
        return res.redirect("/listings");
    }

    newlisting.image = { url: req.file.path, filename: req.file.filename };
    newlisting.category = category;
    newlisting.owner = req.user._id;
    await newlisting.save();
    req.flash("success", "Listing created successfully");
    res.redirect("/listings");
}

// Display the details of a specific listing
module.exports.showList = async (req, res) => {
    let { id } = req.params;
    let listInfo = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");
    
    if (!listInfo) {
        req.flash("error", "This listing is not available");
        res.redirect("/listings");
    }
    res.render("listings/showlist.ejs", { listInfo });
}

// Display the "Update Listing" page
module.exports.updateForm = async (req, res, next) => {
    let { id } = req.params;
    let user = await Listing.findById(id);
    res.render("listings/Update.ejs", { id, user });
}

// Handle the update of an existing listing
module.exports.updatedData = async (req, res, next) => {
    let { id } = req.params;
    let updateInfo = req.body.listing;
    let listing = await Listing.findByIdAndUpdate(id, { ...updateInfo });

    if (req.file) {
        listing.image = { url: req.file.path, filename: req.file.filename };
        await listing.save();
    }

    req.flash("success", "Listing successfully updated");
    res.redirect(`/listings/${id}`);
}

// Handle the deletion of a listing
module.exports.deleteList = async (req, res, next) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing successfully deleted");
    res.redirect("/listings");
}

// Handle the search functionality
module.exports.searchInfo = async (req, res, next) => {
    let { keyword } = req.query;
    try {
        let searchInfo = [];

        if (keyword) {
            searchInfo = await Listing.find({
                $or: [
                    { title: { $regex: keyword, $options: "i" } },
                    { description: { $regex: keyword, $options: "i" } }
                ]
            })
            .populate({ path: "reviews", populate: { path: "author" } })
            .populate("owner");

            if (searchInfo.length === 0) {
                req.flash("error", "No results found for the search keyword.");
            }
        } else {
            searchInfo = await Listing.find({})
                .populate({ path: "reviews", populate: { path: "author" } })
                .populate("owner");
        }
        res.render("listings/index.ejs", { listings: searchInfo });
    } catch (error) {
        next(error);
    }
}