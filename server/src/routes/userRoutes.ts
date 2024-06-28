// src/routes/userRoutes.ts
import express from "express";
import {
  authUser,
  deleteUser,
  getUsers,
  registerUser,
  updateUser,
} from "../controllers/userController";

const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(authUser);

router.route("/").get(getUsers);

router.route("/:id").put(updateUser);
router.route("/:id").delete(deleteUser);

export default router;
