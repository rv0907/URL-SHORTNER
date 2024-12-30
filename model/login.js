const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/url-shortner", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Schema
const loginFormSchema = new mongoose.Schema(
  {
    firstname: {
      type: String, // Corrected type
      required: true, // Corrected property name
    },
    email: {
      type: String, // Corrected type
      required: true, // Corrected property name
      unique: true,
    },
    password: {
      type: String, // Corrected type
      required: true, // Corrected property name
    },
  },
  {
    timestamps: true, // Corrected property name
  }
);

// Define Model
const UserLogin = mongoose.model("UserLogin", loginFormSchema);

module.exports = UserLogin;
