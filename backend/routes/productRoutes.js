import express from "express";

// controllers
import {
  getProductByid,
  getProducts,
} from "../controllers/productController.js";

const router = express.Router();

// router.get("/", getProducts);
router.route("/").get(getProducts);

// router.get("/:id", getProductByid);
router.route("/:id").get(getProductByid);

export default router;
