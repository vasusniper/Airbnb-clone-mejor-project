const express=require('express');
const router=express.Router({mergeParams:true});
const Listing=require("../models/listing.js");
const Review=require('../models/review.js');
const wrapAsync=require('../utils/wrapAsync.js');
const {reviewValidate,isLoggedIn,isReviewOwner}=require('../middleware.js');

//----------Add review--------------------------------------------------
  router.post("/",isLoggedIn,reviewValidate, wrapAsync(async(req,res)=>{
    let listing= await Listing.findById(req.params.id);
    let newReview= new Review(req.body.review);
     newReview.author=req.user._id;
     listing.reviews.push(newReview);
    await listing.save();
    await newReview.save();
    req.flash("success","review successfully created")
    res.redirect(`/listings/${req.params.id}`);
  }));
  //
  router.delete("/:reviewId",isReviewOwner,wrapAsync(async(req,res)=>{
let {id,reviewId}=req.params;
await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
await Review.findByIdAndDelete(reviewId);
req.flash("success","review successfuly deleted")
res.redirect(`/listings/${id}`);

  }))
  module.exports=router;
