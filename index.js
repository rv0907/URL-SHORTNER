const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const urlroutes = require("./routes/url");
const loginroute = require("./routes/login");
const restrictologgeduserONLY = require("./middleware/auth");
const upload = require("./routes/upload");
require("dotenv").config();

const app = express();

// Middleware for handling JSON and URL-encoded data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// Debugging
console.log("Server setup in progress");

// Routes
app.use("/upload", upload);
app.use("/user", restrictologgeduserONLY, urlroutes); // Protected user routes
app.use("/auth", loginroute); // Auth routes

// 404 Fallback Route
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start the server
const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
