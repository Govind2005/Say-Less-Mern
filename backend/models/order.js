import mongoose from 'mongoose';
import Item from './item.js';

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  paid: {type: Boolean},
  items: [
    {
      // Reference to the Item model
      item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
      name:{type: String},
      quantity: { type: Number, required: true },
      special:{type: String},
      customize:{type:String}
    }
  ],
  total: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
