import Item from "../models/item.js";
import mongoose from "mongoose";

export const getItems = async (req, res) => {
  try {
    const items = await Item.find({});
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.log("error: " + error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getItem = async (req, res) => {
const { id } = req.params;
  try {
    const items = await Item.findById(id);
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.log("error: " + error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const createItem = async (req, res) => {
  const item = req.body;
  const newItem = new Item(item);
  try {
    await newItem.save();
    res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    console.log("error: " + error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
export const updateItem = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid item ID" });
    }
  
    try {
      const updatedItem = await Item.findByIdAndUpdate(
        id,
        { ...req.body },
        { new: true }
      );
  
      res.status(200).json({ success: true, data: updatedItem });
    } catch (error) {
      console.log("error: " + error.message);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };

export const deleteItem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid item ID" });
  }

  try {
    await Item.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Item deleted" });
  } catch (error) {
    console.log("error: " + error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
