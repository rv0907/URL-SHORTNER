require("dotenv").config();
const mongoose = require("mongoose");

// use process.env.MONGO_URI
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(" Connected to MongoDB Atlas"))
  .catch((err) => console.error(" MongoDB connection error:", err));

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
