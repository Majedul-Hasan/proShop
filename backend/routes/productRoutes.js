import express from "express";

import { protect, admin } from "../middleware/authMiddleware.js";

// controllers
import {
  getProductByid,
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} from "../controllers/productControllers.js";

const router = express.Router();

// router.get("/", getProducts);
router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/:id/reviews").post(protect, createProductReview);
router.get("/top", getTopProducts);

// router.get("/:id", getProductByid);
router
  .route("/:id")
  .get(getProductByid)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
