import userModel from "../models/User.js";
import { hashPassword, comparePassword } from "../utils/Helper.js";
import JWT from "jsonwebtoken";
import {upload,cloudinary} from '../config/Cloudinary.js'




export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const avatar = req.file; // Get the uploaded avatar file

    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(404).send({
        success: false,
        message: "Already registered, please login",
      });
    }

    // Check if the avatar is provided
    if (!avatar) {
      return res.status(400).send({
        success: false,
        message: "Avatar is required",
      });
    }

    // Upload avatar image to Cloudinary
    const result = await cloudinary.uploader.upload(avatar.path, {
      folder: 'avatars', // Optional: set a specific folder to store the images on Cloudinary
    });

    // Save the URL to the avatar image in the user document
    const avatarUrl = result.secure_url;

    // Register user with avatar
    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
      avatarUrl,
    }).save();

    res.status(200).json({ success: true, message: "Registration success. You will be redirected to login." });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};




export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    //jwt token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avtar: user.avatarUrl,
        isAdmin: user.isAdmin,

      },

      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
}

export const testController = (req, res) => {
  res.send("hello to the world");
}

export const allUsersController = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
}

// Delete a user
export const deleteUserController = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Delete the user from the database
    await userModel.findByIdAndDelete(userId);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
};



// Controller to update user profile
export const updateProfileController = async (req, res) => {
  const { name, phone, avatarUrl, about, bannerUrl } = req.body;
  const userId = req.user._id;

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user profile
    user.name = name;
    user.phone = phone;
    user.avatarUrl = avatarUrl;
    user.bannerUrl = bannerUrl;

    user.about = about;

    await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
};

export const getUserInfoController = async (req, res) => {
  const userId = req.params.userId; // Use req.params.userId to get the userId

  try {
    // Find the user by their ID
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return all user information
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user information:", error);
    res.status(500).json({ error: "Failed to fetch user information" });
  }
};



