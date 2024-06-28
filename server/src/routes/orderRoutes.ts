import express from "express";
import {
  createOrder,
  deleteOrder,
  getOrderById,
  getOrders,
  getOrdersByUserId,
} from "../controllers/orderController";

const router = express.Router();

router.route("/").post(createOrder);
router.route("/").get(getOrders);
router.route("/:id").get(getOrderById);
router.route("/:id").delete(deleteOrder);
router.route("/user/:userId").get(getOrdersByUserId);

export default router;
