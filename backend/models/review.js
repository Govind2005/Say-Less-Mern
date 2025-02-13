import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  name: { type: String}, 
  comment: { type: String}, 
  star: { type: Number},
  visible:{type: Boolean,required: false} 
}, {
    timestamps: true
});


const Review = mongoose.model("Review", reviewSchema);

export default Review;
