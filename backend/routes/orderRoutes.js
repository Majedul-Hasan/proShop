import express from "express";

import { protect } from "../middleware/authMiddleware.js";

// controllers
import { addOrderItems } from "../controllers/orderControler.js";

const router = express.Router();

router.route("/").post(protect, addOrderItems);

export default router;
