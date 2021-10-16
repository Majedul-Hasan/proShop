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

// @desc delete a single products
// @route DELETE /api/products/:id
// @access privet/admin

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product Removed" });
  } else {
    // res.status(404).json({ message: "product not found" });
    res.status(404);
    throw new Error("product not fouund");
  }
});

// @desc create a  product
// @route POST /api/products
// @access privet/admin
/*
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "sample product",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "sample brand",
    category: "sample category",
    description: "sample description",
    numReviews: 0,
    countInStock: 0,
  });

  const createtedProduct = await product.save();
  res.status(201).json(createtedProduct);
});
*/
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc update a  product
// @route PUT /api/products/:id
// @access privet/admin

/*

const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,

    image,
    brand,
    category,
    description,
    countInStock,
  } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.description = description;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
*/

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
export {
  getProducts,
  getProductByid,
  deleteProduct,
  createProduct,
  updateProduct,
};
