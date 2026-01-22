import express from "express";
import { Analytics } from "../models/Analytics.js";

const router = express.Router();

// @desc    Get all analytics
// @route   GET /api/analytics
// @access  Public
router.get("/", async (req, res) => {
  try {
    const analytics = await Analytics.find({}).populate("userId", "name email").sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      count: analytics.length,
      data: analytics,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch analytics",
      error: error.message,
    });
  }
});

// @desc    Get analytics by user ID
// @route   GET /api/analytics/user/:userId
// @access  Public
router.get("/user/:userId", async (req, res) => {
  try {
    const analytics = await Analytics.find({ userId: req.params.userId })
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      count: analytics.length,
      data: analytics,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch user analytics",
      error: error.message,
    });
  }
});

// @desc    Create new analytics entry
// @route   POST /api/analytics
// @access  Public
router.post("/", async (req, res) => {
  try {
    const {
      userId,
      eventType,
      eventData,
      pageUrl,
      browser,
      extensionVersion,
      sessionId,
    } = req.body;

    const analytics = await Analytics.create({
      userId,
      eventType,
      eventData,
      pageUrl,
      browser,
      extensionVersion,
      sessionId,
      timestamp: new Date(),
    });

    res.status(201).json({
      status: "success",
      message: "Analytics entry created successfully",
      data: analytics,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to create analytics entry",
      error: error.message,
    });
  }
});

// @desc    Get analytics summary
// @route   GET /api/analytics/summary
// @access  Public
router.get("/summary", async (req, res) => {
  try {
    const totalEvents = await Analytics.countDocuments();
    const uniqueUsers = await Analytics.distinct("userId").countDocuments();
    const todayEvents = await Analytics.countDocuments({
      timestamp: {
        $gte: new Date(new Date().setHours(0, 0, 0, 0)),
      },
    });

    // Get event type distribution
    const eventTypes = await Analytics.aggregate([
      {
        $group: {
          _id: "$eventType",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    // Get browser distribution
    const browserStats = await Analytics.aggregate([
      {
        $group: {
          _id: "$browser",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    res.status(200).json({
      status: "success",
      data: {
        totalEvents,
        uniqueUsers,
        todayEvents,
        eventTypes,
        browserStats,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch analytics summary",
      error: error.message,
    });
  }
});

// @desc    Get analytics by date range
// @route   GET /api/analytics/range
// @access  Public
router.get("/range", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const query = {};
    if (startDate && endDate) {
      query.timestamp = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const analytics = await Analytics.find(query)
      .populate("userId", "name email")
      .sort({ timestamp: -1 });

    res.status(200).json({
      status: "success",
      count: analytics.length,
      data: analytics,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch analytics by date range",
      error: error.message,
    });
  }
});

export default router;
