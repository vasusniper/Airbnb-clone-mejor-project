const Listing=require("./models/listing");
const Review = require("./models/review.js");
const {listingSchema,reviewSchema}=require("./models/schemasValidate.js");
const ExpressError=require('./utils/expressError.js');
module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","you must be login");
        return res.redirect("/login");
     }
     next();
}
module.exports.saveredirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
        }
        next();
    };
module.exports.isOwner=(async(req,res,next)=>{
    let {id}=req.params;
    let listings=await Listing.findById(id);
    if(!listings.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","You don't have permission to edit");
        return res.redirect(`/listings/${id}`);

    }
    next();

});
// Backend Validation chaque error function---------------------------
module.exports.listingValidate= async(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>{return el.message }).join(',');
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }

};
// -- review Validate--------------------------------------------------
module.exports.reviewValidate=async(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>{return el.message }).join(',');
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }

};
module.exports.isReviewOwner=(async(req,res,next)=>{
    let {id,reviewId}=req.params;
    let review=await Review.findById(reviewId);
    if(!review.author._id.equals(res.locals.currUser._id)){
        req.flash("error","You are not author of this review");
        return res.redirect(`/listings/${id}`);

    }
    next();

});