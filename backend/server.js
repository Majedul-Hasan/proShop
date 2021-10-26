/*
const express = require("express");
const dotenv = require("dotenv");

const products = require("./data/products");
*/

import path from "path";
import express from "express";
import dotenv from "dotenv";
// import products from "./data/products.js";
import productRoutes from "./routes/productRoutes.js";

//user route
import userRoutes from "./routes/userRoutes.js";
//order route
import orderRoutes from "./routes/orderRoutes.js";

// upload routes
import uploadRoutes from "./routes/uploadRoutes.js";

// connect to db
import connectDB from "./config/db.js";

//morgan logger
import morgan from "morgan";

//error middleware
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
const app = express();

dotenv.config();

// morgan logger should use after  dotenv.config

if (process.env.NODE_ENV === "Development") {
  app.use(morgan("dev"));
}

connectDB();

app.use(express.json()); //this allows json to the body

// api rought
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
// app.use("/api/orders", orderRoutes);
app.use("/api/orders", orderRoutes);

app.use("/api/upload", uploadRoutes);

const __dirname = path.resolve();

// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("api is running...");
  });
}

// paypal integration

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

//error middleware
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5050;

app.listen(
  port,
  console.log(
    `server is running in ${process.env.NODE_ENV} mode port No.  ${port} to exit press ctrl + C`
  )
);
