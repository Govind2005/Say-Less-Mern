import Item from "../models/item.js";
import mongoose from "mongoose";
import { v2 as cloudinary } from 'cloudinary';

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
  console.log(req.body);
  try {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    
    const image_url = req.body.image_url;
      console.log("Received image payload size:", image_url.length);
        const cloudinary_res = await cloudinary.uploader.upload(image_url, {
            folder: "Bindi Pics",
        });
    const image_link = cloudinary_res.secure_url;
      console.log(cloudinary_res);
  item.image = image_link;
  const newItem = new Item(item);
  await newItem.save();
      return res.status(201).json({success: true, data: newItem, message: "Uploading image successfully"})
  } catch (error) {
    console.log("error: " + error.message);
    res.status(500).json({ success: false, message: "Uploading image failed" });
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
