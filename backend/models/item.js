import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: { type: String}, 
  type: { type: String}, 
  image: { type: String}, 
  price: { type: Number}, 
  available: { type: Boolean}, 
}, {
    timestamps: true
});


const Item = mongoose.model("Item", itemSchema);

export default Item;
