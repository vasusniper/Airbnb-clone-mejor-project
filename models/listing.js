const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review=require("./review.js");
const { string, required } = require("joi");

const listingSchema = new Schema({
  title: {
    type: String,
  },
  description: String,
  image:{
   url:String,
   filename:String
  },
  price:{
    type:Number,
    default:1000,
  },
  location: String,
  country: String,
  reviews:[{
    type:Schema.Types.ObjectId,
    ref:"Review"
  }],
  owner:{
    type:Schema.Types.ObjectId,
    ref:"User"
},
category:{
  type:String,
  enum:[
    "Trending",
    "Rooms",
    "Castle",
    "Amazing pools",
    "Camping",
    "Treehouse",
    "Mountain",
    "Beach",
    "Luxury Stay",
    "Cave",
    "Desert"],
    required:true,
  
}
});
listingSchema.post("findOneAndDelete",async(listing)=>{
  if (listing){
    await Review.deleteMany({_id:{$in: listing.reviews}})
  }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;