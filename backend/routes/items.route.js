import express from "express";
import {
  createItem,
  deleteItem,
  getItems,
  getItem,
  updateItem,
} from "../controller/item.controller.js";

const router = express.Router();

router.get("/", getItems);

router.get("/:id",getItem);

router.post("/", createItem);

router.put("/:id", updateItem);

router.delete("/:id", deleteItem);

export default router;
