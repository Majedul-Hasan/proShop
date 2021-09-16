import Mongoose from "mongoose";
const { Schema } = Mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    isAdmin: {
      type: Boolean,
      require: true,
      default: false,
    },
  },
  { timesStammps: true }
);

const User = Mongoose.model("User", userSchema);

export default User;
