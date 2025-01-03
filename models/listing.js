const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review=require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
  },
  description: String,
  image:{
      type: String,
      default:"https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?cs=srgb&dl=pexels-binyaminmellish-186077.jpg&fm=jpg",
    set:(v)=>v==="" ? "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?cs=srgb&dl=pexels-binyaminmellish-186077.jpg&fm=jpg":v,
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
}
});
listingSchema.post("findOneAndDelete",async(listing)=>{
  if (listing){
    await Review.deleteMany({_id:{$in: listing.reviews}})
  }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;