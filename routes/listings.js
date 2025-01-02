const express=require('express');
const router=express.Router();
const Listing=require("../models/listing.js");
const wrapAsync=require('../utils/wrapAsync.js');
const {isLoggedIn,isOwner,listingValidate}=require("../middleware.js");
//Index Router---------------------------------------------
router.get("/",wrapAsync(async (req, res) => {
    let listings = await Listing.find({});
    res.render("listings/index.ejs",{ listings});

}));
// Create Get Rout-----------------------------------------------------
router.get("/new",isLoggedIn,(req,res)=>{
res.render("listings/addNew.ejs");

});
// Create POST Route--------------------------------------------------
router.post("/",isLoggedIn,listingValidate,wrapAsync(async(req,res)=>{
let listing=new Listing(req.body.listing);
listing.owner=req.user._id;
await listing.save();
req.flash("success","listing Created successfully")
res.redirect("/listings");
}));

//Show Route listings-----------------------------------------------------
router.get("/:id",wrapAsync(async(req,res)=>{
let {id}=req.params;
let listInfo= await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
if(!listInfo){
    req.flash("error","This list not availble");
    res.redirect("/listings");
}
res.render("listings/showlist.ejs",{listInfo});

}));

//Update Get Route----------------------------------------------
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(async(req,res,next)=>{
    let {id}=req.params;
    let user= await Listing.findById(id);
    res.render("listings/Update.ejs",{id,user});
}))
//Update Route----------------------------------------------------
router.put("/:id",listingValidate,wrapAsync(async(req,res,next)=>{
    let {id}=req.params;
    let updateInfo=req.body.listing;
    await Listing.findByIdAndUpdate(id,{...updateInfo});
    req.flash("success","listing successfully Updaated")
    res.redirect(`/listings/${id}`)
    
}));
// DELETE request----------------------------------------------
router.delete("/:id",isLoggedIn,isOwner, wrapAsync(async(req,res,next)=>{
    let {id}=req.params;
await Listing.findByIdAndDelete(id);
req.flash("success","listing successfully deleted")
res.redirect("/listings");
}));
module.exports=router;
