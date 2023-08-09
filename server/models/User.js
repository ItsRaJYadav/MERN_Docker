import { Schema, model } from "mongoose";

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
      unique: true, // Add unique constraint
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
    },
    about: {
        type: String,
        default: "This is the about section content of your account",
    },
    phone: {
        type: Number,
        default: 9472040607,
    },
    avatarUrl: {
        type: String,
        required: true,
    },
    bannerUrl: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2017/09/11/15/34/animals-2739386_1280.jpg",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
    
  },
  { timestamps: true }
);

export default model("User", userSchema);
