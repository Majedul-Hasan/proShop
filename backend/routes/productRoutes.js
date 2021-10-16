import express from "express";

// controllers
import {
  getProductByid,
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
} from "../controllers/productControllers.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// router.get("/", getProducts);
router.route("/").get(getProducts).post(protect, admin, createProduct);

// router.get("/:id", getProductByid);
router
  .route("/:id")
  .get(getProductByid)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
