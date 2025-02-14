import express from "express";
import { createOrder, getOrders,deleteOrder,getOrder } from "../controller/order.controller.js";
const router = express.Router();

router.get("/", getOrders);

router.get("/:id", getOrder);

router.post("/", createOrder);

router.delete("/:id", deleteOrder);

export default router;
