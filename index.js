const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const urlroutes = require("./routes/url");
const loginroute = require("./routes/login");
const restrictologgeduserONLY = require("./middleware/auth");

const app = express();

// Middleware for handling JSON and URL-encoded data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// Set up view engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./view"));

// Debugging
console.log("Server setup in progress");

// Routes
app.use("/user", restrictologgeduserONLY, urlroutes); // Protected `/user` routes
app.use("/login", loginroute); // Public login route

// 404 Fallback Route
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start the server
const PORT = 8001;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
