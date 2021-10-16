import Mongoose from "mongoose";
const { Schema } = Mongoose;

const orderSchema = new Schema(
  {
    user: {
      type: Mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    orderItems: [
      {
        name: {
          type: String,
          require: true,
        },
        qty: {
          type: Number,
          require: true,
        },
        image: {
          type: String,
          require: true,
        },
        price: {
          type: Number,
          require: true,
        },
        product: {
          type: Mongoose.Schema.Types.ObjectId,
          require: true,
          ref: "Product",
        },
      },
    ],
    shippingAddress: {
      address: { type: String, require: true },
      city: { type: String, require: true },
      pstalCode: { type: Number, require: true },
      country: { type: String, require: true },
    },
    paymentMethod: {
      type: String,
      require: true,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    texPrice: {
      type: Number,
      require: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      require: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      require: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      require: true,
      default: false,
    },
    delivereddAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = Mongoose.model("Order", orderSchema);

export default Order;
