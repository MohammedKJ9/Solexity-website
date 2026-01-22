import express from "express";
import { User } from "../models/User.js";

const router = express.Router();

// @desc    Get all users
// @route   GET /api/users
// @access  Public
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json({
      status: "success",
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch users",
      error: error.message,
    });
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch user",
      error: error.message,
    });
  }
});

// @desc    Create new user
// @route   POST /api/users
// @access  Public
router.post("/", async (req, res) => {
  try {
    const { name, email, browser, extensionVersion } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: "error",
        message: "User already exists",
      });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      browser,
      extensionVersion,
      lastActive: new Date(),
    });

    res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        browser: user.browser,
        extensionVersion: user.extensionVersion,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to create user",
      error: error.message,
    });
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Public
router.put("/:id", async (req, res) => {
  try {
    const { name, email, browser, extensionVersion } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        browser,
        extensionVersion,
        lastActive: new Date(),
      },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to update user",
      error: error.message,
    });
  }
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Public
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to delete user",
      error: error.message,
    });
  }
});

export default router;
