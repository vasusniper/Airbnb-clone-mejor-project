const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reviewSchema=new Schema({
    comment:{
        type:String,
    },
    rating:{
        type:Number,
        min:1,
        max:5,
    },
    createdAt: {
        type: Date, // Correctly specify the data type
        default: Date.now, // Use `default` to assign the current timestamp
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
    
});
const Review=mongoose.model("Review",reviewSchema);
module.exports=Review;