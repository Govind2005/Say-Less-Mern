import express from "express";
import {
  createReview,
  deleteReview,
  updateReview,
  getReviews,
  getReview
} from "../controller/review.controller.js";

const router = express.Router();

router.get("/", getReviews);

router.get("/:id", getReview);

router.post("/", createReview);

router.put("/:id", updateReview);

router.delete("/:id", deleteReview);

export default router;
