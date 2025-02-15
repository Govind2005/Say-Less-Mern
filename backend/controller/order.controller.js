import Order from "../models/order.js";
import mongoose from "mongoose";
import Item from "../models/item.js";

export const getOrders = async (req, res) => {
    try {
      const orders = await Order.find({});
      console.log("reviews found:", orders);
      res.status(200).json({ success: true, data: orders });
    } catch (error) {
      console.log("error: " + error.message);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };

  export const getOrder = async (req, res) => {
    const { id } = req.params;
      try {
        const orders = await Order.findById(id);
        console.log("order found:", orders);
        res.status(200).json({ success: true, data: orders });
      } catch (error) {
        console.log("error: " + error.message);
        res.status(500).json({ success: false, message: "Server error" });
      }
    };


export const createOrder = async (req, res) => {
    const { name, phoneNumber, items, total } = req.body;
// Create an array of item references with quantities
const orderItems = await Promise.all(
  items.map(async (cartItem) => {
    const item = await Item.findById(cartItem._id);
    if (!item) {
      return null;  // Skip if the item does not exist
    }
    return {
      item: item._id,  // Store the item reference (_id)
      quantity: cartItem.quantity,  // Store quantity
      name: item.name,
      special: cartItem.special,
      customize:cartItem.customize
    };
  })
);

// Filter out any null items (in case the item wasn't found)
const validOrderItems = orderItems.filter(orderItem => orderItem !== null);
// Create a new order
const newOrder = new Order({
  name,
  phoneNumber,
  items: validOrderItems,
  total,
});

try {
  await newOrder.save();  // Save the order to MongoDB
  res.json({ success: true, message: 'Order saved successfully!' });
} catch (error) {
  console.error(error);
  res.status(500).json({ success: false, error: 'Failed to save order' });
}
};

export const deleteOrder = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid item ID" });
  }

  try {
    await Order.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Item deleted" });
  } catch (error) {
    console.log("error: " + error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
