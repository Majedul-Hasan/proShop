import asyncHandler from "express-async-handler";

import Product from "../models/productModel.js";

// @desc fetch all products
// @route get /api/products
// @access public

const getProducts = asyncHandler(async (req, res) => {
  const product = await Product.find({});

  res.json(product);
});

// @desc fetch a single products
// @route get /api/products/:id
// @access public

const getProductByid = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    // res.status(404).json({ message: "product not found" });
    res.status(404);
    throw new Error("product not fouund");
  }
});

export { getProducts, getProductByid };
