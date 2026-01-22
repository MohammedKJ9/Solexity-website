import express from "express";
import { Download } from "../models/Download.js";

const router = express.Router();

// @desc    Get all downloads
// @route   GET /api/downloads
// @access  Public
router.get("/", async (req, res) => {
  try {
    const downloads = await Download.find({})
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      count: downloads.length,
      data: downloads,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch downloads",
      error: error.message,
    });
  }
});

// @desc    Get download by ID
// @route   GET /api/downloads/:id
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const download = await Download.findById(req.params.id)
      .populate("userId", "name email");

    if (!download) {
      return res.status(404).json({
        status: "error",
        message: "Download record not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: download,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch download",
      error: error.message,
    });
  }
});

// @desc    Create new download record
// @route   POST /api/downloads
// @access  Public
router.post("/", async (req, res) => {
  try {
    const {
      userId,
      browser,
      platform,
      userAgent,
      ipAddress,
      country,
      city,
      downloadType,
    } = req.body;

    const download = await Download.create({
      userId,
      browser,
      platform,
      userAgent,
      ipAddress,
      country,
      city,
      downloadType,
      timestamp: new Date(),
    });

    res.status(201).json({
      status: "success",
      message: "Download record created successfully",
      data: download,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to create download record",
      error: error.message,
    });
  }
});

// @desc    Get download statistics
// @route   GET /api/downloads/stats/summary
// @access  Public
router.get("/stats/summary", async (req, res) => {
  try {
    const totalDownloads = await Download.countDocuments();
    const uniqueUsers = await Download.distinct("userId").countDocuments();
    const todayDownloads = await Download.countDocuments({
      timestamp: {
        $gte: new Date(new Date().setHours(0, 0, 0, 0)),
      },
    });

    // Get browser distribution
    const browserStats = await Download.aggregate([
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

    // Get platform distribution
    const platformStats = await Download.aggregate([
      {
        $group: {
          _id: "$platform",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    // Get download type distribution
    const downloadTypeStats = await Download.aggregate([
      {
        $group: {
          _id: "$downloadType",
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
        totalDownloads,
        uniqueUsers,
        todayDownloads,
        browserStats,
        platformStats,
        downloadTypeStats,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch download statistics",
      error: error.message,
    });
  }
});

// @desc    Get downloads by date range
// @route   GET /api/downloads/stats/range
// @access  Public
router.get("/stats/range", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const query = {};
    if (startDate && endDate) {
      query.timestamp = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const downloads = await Download.find(query)
      .populate("userId", "name email")
      .sort({ timestamp: -1 });

    res.status(200).json({
      status: "success",
      count: downloads.length,
      data: downloads,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch downloads by date range",
      error: error.message,
    });
  }
});

// @desc    Get download links
// @route   GET /api/downloads/links
// @access  Public
router.get("/links", async (req, res) => {
  try {
    const downloadLinks = {
      chrome: {
        webstore: "https://chrome.google.com/webstore/detail/solexity-ai/your-extension-id",
        direct: "/downloads/solexity-ai-chrome.crx",
        version: "1.0.0",
        size: "2.5MB",
      },
      firefox: {
        addons: "https://addons.mozilla.org/en-US/firefox/addon/solexity-ai/",
        direct: "/downloads/solexity-ai-firefox.xpi",
        version: "1.0.0",
        size: "2.3MB",
      },
      edge: {
        webstore: "https://microsoftedge.microsoft.com/addons/detail/solexity-ai/your-extension-id",
        direct: "/downloads/solexity-ai-edge.crx",
        version: "1.0.0",
        size: "2.5MB",
      },
    };

    res.status(200).json({
      status: "success",
      data: downloadLinks,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch download links",
      error: error.message,
    });
  }
});

export default router;
