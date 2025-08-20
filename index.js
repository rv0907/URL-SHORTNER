const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

// Routes
const loginroute = require("./routes/login");
const urlroutes = require("./routes/urlroutes");
const uploadRouter = require("./routes/upload");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

// Routes
app.use("/auth", loginroute);
app.use("/user", urlroutes);
app.use("/upload", uploadRouter);

// Home page
app.get("/", (req, res) => {
  res.render("home");
});

// 404 Handler
app.use((req, res) => {
  res.status(404).render("404", { url: req.originalUrl });
});

// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
