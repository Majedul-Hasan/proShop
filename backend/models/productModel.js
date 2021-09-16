import Mongoose from "mongoose";
const { Schema } = Mongoose;
const reviewSchema = Mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    rating: {
      type: Number,
      require: true,
    },
    comment: {
      type: String,
      require: true,
    },
  },
  {
    timesStammps: true,
  }
);

const productSchema = new Schema(
  {
    user: {
      type: Mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },

    name: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
      unique: true,
    },
    brand: {
      type: String,
      require: true,
    },
    catagory: {
      type: String,
      require: true,
    },
    descriptinn: {
      type: String,
      require: true,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      require: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      require: true,
      default: 0,
    },
    price: {
      type: Number,
      require: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      require: true,
      default: 0,
    },
  },
  {
    timesStammps: true,
  }
);

const Product = Mongoose.model("Product", productSchema);

export default Product;
