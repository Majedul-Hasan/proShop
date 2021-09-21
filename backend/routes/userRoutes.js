import express from "express";

import { protect } from "../middleware/authMiddleware.js";

// controllers
import {
  authUser,
  registerUser,
  getUserProfile,
} from "../controllers/userControllers.js";

const router = express.Router();

router.route("/").post(registerUser);
router.post("/login", authUser);

router.route("/profile").get(protect, getUserProfile);

export default router;
