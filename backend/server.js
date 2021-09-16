/*
const express = require("express");
const dotenv = require("dotenv");

const products = require("./data/products");
*/

import express from "express";
import dotenv from "dotenv";
// import products from "./data/products.js";
import productRoutes from "./routes/productRoutes.js";
// connect to db
import connectDB from "./config/db.js";
//error middleware
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
const app = express();
dotenv.config();

connectDB();

app.get("/", (req, res) => {
  res.send("api is running...");
});

// api rought
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use("/api/products", productRoutes);
//error middleware
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(
  port,
  console.log(
    `server is running in ${process.env.NODE_ENV} mode port No.  ${port} to exit press ctrl + C`
  )
);
