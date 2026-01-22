import mongoose from "mongoose";

const downloadSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    browser: {
      type: String,
      required: [true, "Browser is required"],
      enum: ["chrome", "firefox", "edge", "safari", "other"],
    },
    platform: {
      type: String,
      required: [true, "Platform is required"],
      enum: ["windows", "macos", "linux", "android", "ios", "other"],
    },
    userAgent: {
      type: String,
      trim: true,
    },
    ipAddress: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    downloadType: {
      type: String,
      required: [true, "Download type is required"],
      enum: ["webstore", "manual","zip"],
      default: "webstore",
    },
    downloadSource: {
      type: String,
      enum: ["chrome_webstore", "firefox_addons", "edge_addons", "direct_link", "manual"],
      default: "chrome_webstore",
    },
    extensionVersion: {
      type: String,
      default: "1.0.0",
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    metadata: {
      referrer: String,
      utmSource: String,
      utmMedium: String,
      utmCampaign: String,
      utmTerm: String,
      utmContent: String,
      sessionId: String,
      pageUrl: String,
    },
    status: {
      type: String,
      enum: ["initiated", "completed", "failed", "cancelled"],
      default: "initiated",
    },
    fileInfo: {
      size: Number,
      checksum: String,
      fileName: String,
    },
    errors: {
      hasError: {
        type: Boolean,
        default: false,
      },
      errorMessage: String,
      errorCode: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    suppressReservedKeysWarning: true,
  }
);

// Indexes for better query performance
downloadSchema.index({ userId: 1, timestamp: -1 });
downloadSchema.index({ browser: 1, timestamp: -1 });
downloadSchema.index({ platform: 1, timestamp: -1 });
downloadSchema.index({ downloadType: 1, timestamp: -1 });
downloadSchema.index({ status: 1, timestamp: -1 });
downloadSchema.index({ timestamp: -1 });
downloadSchema.index({ country: 1, timestamp: -1 });

// Virtual for download summary
downloadSchema.virtual("downloadSummary").get(function () {
  return {
    id: this._id,
    browser: this.browser,
    platform: this.platform,
    downloadType: this.downloadType,
    status: this.status,
    timestamp: this.timestamp,
    country: this.country,
  };
});

// Virtual for formatted timestamp
downloadSchema.virtual("formattedTimestamp").get(function () {
  return this.timestamp.toISOString();
});

// Pre-save middleware to validate and set defaults
downloadSchema.pre("save", function (next) {
  // Ensure timestamp is set
  if (!this.timestamp) {
    this.timestamp = new Date();
  }

  // Set download source based on browser and download type
  if (this.downloadType === "webstore") {
    switch (this.browser) {
      case "chrome":
        this.downloadSource = "chrome_webstore";
        break;
      case "firefox":
        this.downloadSource = "firefox_addons";
        break;
      case "edge":
        this.downloadSource = "edge_addons";
        break;
      default:
        this.downloadSource = "direct_link";
    }
  } else if (this.downloadType === "zip") {
    this.downloadSource = "direct_link";
  } else {
    this.downloadSource = "manual";
  }

  next();
});

// Static method to get downloads by browser
downloadSchema.statics.getByBrowser = function (browser, limit = 100) {
  return this.find({ browser })
    .populate("userId", "name email")
    .sort({ timestamp: -1 })
    .limit(limit);
};

// Static method to get downloads by platform
downloadSchema.statics.getByPlatform = function (platform, limit = 100) {
  return this.find({ platform })
    .populate("userId", "name email")
    .sort({ timestamp: -1 })
    .limit(limit);
};

// Static method to get successful downloads
downloadSchema.statics.getSuccessfulDownloads = function (limit = 100) {
  return this.find({ status: "completed" })
    .populate("userId", "name email")
    .sort({ timestamp: -1 })
    .limit(limit);
};

// Static method to get download statistics
downloadSchema.statics.getDownloadStats = function (startDate, endDate) {
  const query = {};
  if (startDate && endDate) {
    query.timestamp = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }

  return this.aggregate([
    { $match: query },
    {
      $group: {
        _id: {
          browser: "$browser",
          platform: "$platform",
          status: "$status",
        },
        count: { $sum: 1 },
      },
    },
    {
      $group: {
        _id: {
          browser: "$_id.browser",
          platform: "$_id.platform",
        },
        statuses: {
          $push: {
            status: "$_id.status",
            count: "$count",
          },
        },
        totalCount: { $sum: "$count" },
      },
    },
    { $sort: { totalCount: -1 } },
  ]);
};

// Instance method to mark download as completed
downloadSchema.methods.markCompleted = function (fileInfo = {}) {
  this.status = "completed";
  this.fileInfo = { ...this.fileInfo, ...fileInfo };
  return this.save();
};

// Instance method to mark download as failed
downloadSchema.methods.markFailed = function (error) {
  this.status = "failed";
  this.errors = {
    hasError: true,
    errorMessage: error.message || "Download failed",
    errorCode: error.code || "UNKNOWN_ERROR",
  };
  return this.save();
};

const Download = mongoose.model("Download", downloadSchema);

export { Download };
