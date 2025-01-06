const express=require('express');
const router=express.Router({mergeParams:true});
const Listing=require("../models/listing.js");
const Review=require('../models/review.js');
const wrapAsync=require('../utils/wrapAsync.js');
const {reviewValidate,isLoggedIn,isReviewOwner}=require('../middleware.js');
const { addReview, deleteReview } = require('../controllers/review.js');

//----------Add review--------------------------------------------------
  router.post("/",isLoggedIn,reviewValidate, wrapAsync(addReview));
  //
  router.delete("/:reviewId",isReviewOwner,wrapAsync(deleteReview))
  module.exports=router;
