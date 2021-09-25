import asyncHandler from "express-async-handler";

import Order from "../models/orderModel.js";

// @desc Create new order
// @route POST /api/orders
// @access Privet

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemPrice,
    shippingPrice,
    texPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.lengtg === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemPrice,
      shippingPrice,
      texPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

export { addOrderItems };
