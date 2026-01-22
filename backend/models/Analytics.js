import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    eventType: {
      type: String,
      required: [true, "Event type is required"],
      enum: [
        "extension_installed",
        "extension_activated",
        "download_clicked",
        "feature_used",
        "error_occurred",
        "session_started",
        "session_ended",
        "page_visited",
        "button_clicked",
        "form_submitted",
        "settings_changed",
      ],
    },
    eventData: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    pageUrl: {
      type: String,
      trim: true,
    },
    browser: {
      type: String,
      enum: ["chrome", "firefox", "other"],
      default: "other",
    },
    extensionVersion: {
      type: String,
      default: "1.0.0",
    },
    sessionId: {
      type: String,
      trim: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    metadata: {
      userAgent: String,
      ipAddress: String,
      country: String,
      city: String,
      timezone: String,
      screenResolution: String,
      language: String,
      referrer: String,
    },
    performance: {
      loadTime: Number,
      processingTime: Number,
      memoryUsage: Number,
    },
    errors: {
      hasError: {
        type: Boolean,
        default: false,
      },
      errorMessage: String,
      errorStack: String,
      errorType: String,
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
analyticsSchema.index({ userId: 1, timestamp: -1 });
analyticsSchema.index({ eventType: 1, timestamp: -1 });
analyticsSchema.index({ sessionId: 1 });
analyticsSchema.index({ timestamp: -1 });
analyticsSchema.index({ browser: 1 });

// Virtual for formatted timestamp
analyticsSchema.virtual("formattedTimestamp").get(function () {
  return this.timestamp.toISOString();
});

// Virtual for event summary
analyticsSchema.virtual("eventSummary").get(function () {
  return {
    id: this._id,
    eventType: this.eventType,
    timestamp: this.timestamp,
    browser: this.browser,
    extensionVersion: this.extensionVersion,
    hasError: this.errors.hasError,
  };
});

// Pre-save middleware to validate event data
analyticsSchema.pre("save", function (next) {
  // Ensure timestamp is set
  if (!this.timestamp) {
    this.timestamp = new Date();
  }
  
  // Validate event data structure
  if (this.eventData && typeof this.eventData !== "object") {
    this.eventData = { value: this.eventData };
  }
  
  next();
});

// Static method to get analytics by event type
analyticsSchema.statics.getByEventType = function (eventType, limit = 100) {
  return this.find({ eventType })
    .populate("userId", "name email")
    .sort({ timestamp: -1 })
    .limit(limit);
};

// Static method to get user analytics
analyticsSchema.statics.getUserAnalytics = function (userId, limit = 100) {
  return this.find({ userId })
    .sort({ timestamp: -1 })
    .limit(limit);
};

// Static method to get analytics summary
analyticsSchema.statics.getSummary = function (startDate, endDate) {
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
        _id: "$eventType",
        count: { $sum: 1 },
        uniqueUsers: { $addToSet: "$userId" },
      },
    },
    {
      $project: {
        eventType: "$_id",
        count: 1,
        uniqueUsers: { $size: "$uniqueUsers" },
      },
    },
    { $sort: { count: -1 } },
  ]);
};

// Instance method to add error information
analyticsSchema.methods.addError = function (error) {
  this.errors = {
    hasError: true,
    errorMessage: error.message,
    errorStack: error.stack,
    errorType: error.constructor.name,
  };
  return this.save();
};

const Analytics = mongoose.model("Analytics", analyticsSchema);

export { Analytics };
