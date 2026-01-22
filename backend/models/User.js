import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot be more than 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    browser: {
      type: String,
      enum: ["chrome", "firefox", "edge", "safari", "other"],
      default: "other",
    },
    extensionVersion: {
      type: String,
      default: "1.0.0",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastActive: {
      type: Date,
      default: Date.now,
    },
    preferences: {
      theme: {
        type: String,
        enum: ["light", "dark", "auto"],
        default: "auto",
      },
      notifications: {
        type: Boolean,
        default: true,
      },
      analytics: {
        type: Boolean,
        default: true,
      },
    },
    stats: {
      totalSessions: {
        type: Number,
        default: 0,
      },
      totalAnalytics: {
        type: Number,
        default: 0,
      },
      lastDownload: {
        type: Date,
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Index for better query performance
userSchema.index({ lastActive: -1 });
userSchema.index({ createdAt: -1 });

// Virtual for user's full profile
userSchema.virtual("fullProfile").get(function () {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    browser: this.browser,
    extensionVersion: this.extensionVersion,
    isActive: this.isActive,
    lastActive: this.lastActive,
    preferences: this.preferences,
    stats: this.stats,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
});

// Pre-save middleware to update lastActive
userSchema.pre("save", function (next) {
  this.lastActive = new Date();
  next();
});

// Static method to get active users
userSchema.statics.getActiveUsers = function () {
  return this.find({ isActive: true }).sort({ lastActive: -1 });
};

// Instance method to update user activity
userSchema.methods.updateActivity = function () {
  this.lastActive = new Date();
  this.stats.totalSessions += 1;
  return this.save();
};

const User = mongoose.model("User", userSchema);

export { User };
