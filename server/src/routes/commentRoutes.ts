import express from "express";
import {
  addComment,
  getCommentsByProduct,
} from "../controllers/commentController";

const router = express.Router();

router.route("/").post(addComment);
router.route("/:productId").get(getCommentsByProduct);

export default router;
