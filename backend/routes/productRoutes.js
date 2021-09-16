import express from "express";

import asyncHandler from "express-async-handler";

import Product from "../models/productModel.js";

const router = express.Router();

// @desc fetch all products
// @route get /api/products
// @access public

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const product = await Product.find({});

    res.json(product);
  })
);

// @desc fetch a single products
// @route get /api/products/:id
// @access public

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      // res.status(404).json({ message: "product not found" });
      res.status(404);
      throw new Error("product not fouund");
    }
  })
);

export default router;
