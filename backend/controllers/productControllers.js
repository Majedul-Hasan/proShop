import asyncHandler from "express-async-handler";

import Product from "../models/productModel.js";

// @desc fetch all products
// @route get /api/products
// @access public

const getProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const product = await Product.find({ ...keyword });

  res.json(product);
});

// @desc fetch a single product
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

// @desc delete a product
// @route delet /api/products/:id
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

// @desc Create a product
// @route Post /api/products
// @access privet/admin

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

// @desc UPDATE a product
// @route put /api/products/:id
// @access privet/admin

const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,

    image,
    brand,
    category,
    countInStock,
    numReviews,
    description,
  } = req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;

    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    product.numReviews = numReviews;
    product.description = description;

    const updatededProduct = await product.save();
    res.status(201).json(updatededProduct);
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});

// @desc Create new review
// @route POST /api/products/:id/reviews
// @access privet

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("product already Reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "review added" });
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});

export {
  getProducts,
  getProductByid,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
};
