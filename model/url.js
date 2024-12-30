const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/url-shortner");

// Define Schema
console.log("g");
const userSchema = new mongoose.Schema(
  {
    shortid: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    vistorhistory: [
      {
        timestamp: { type: Number },
      },
    ],
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create Model
const User = mongoose.model("User", userSchema);

// Export Model
module.exports = User;
