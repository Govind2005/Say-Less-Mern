import Review from "../models/review.js";
import mongoose from "mongoose";

export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({});
    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    console.log("error: " + error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getReview = async (req, res) => {
    const { id } = req.params;
      try {
        const reviews = await Review.findById(id);
        res.status(200).json({ success: true, data: reviews });
      } catch (error) {
        console.log("error: " + error.message);
        res.status(500).json({ success: false, message: "Server error" });
      }
    };

export const createReview = async (req, res) => {
  const review = req.body;
  const newReview = new Review(review);
  try {
    await newReview.save();
    res.status(201).json({ success: true, data: newReview });
  } catch (error) {
    console.log("error: " + error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateReview = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid item ID" });
    }
  
    try {
      const updatedReview = await Review.findByIdAndUpdate(
        id,
        { ...req.body },
        { new: true }
      );
  
      res.status(200).json({ success: true, data: updateReview });
    } catch (error) {
      console.log("error: " + error.message);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };

export const deleteReview = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid item ID" });
  }

  try {
    await Review.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Item deleted" });
  } catch (error) {
    console.log("error: " + error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
