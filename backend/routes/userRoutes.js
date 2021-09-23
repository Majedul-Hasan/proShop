import express from "express";

import { protect } from "../middleware/authMiddleware.js";

// controllers
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userControllers.js";

const router = express.Router();

router.route("/").post(registerUser);
router.post("/login", authUser);

router.route("/profile").get(protect, getUserProfile);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
