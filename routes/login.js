const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Signup Page
router.get("/signup", (req, res) => {
  res.render("signup");
});

// Signup Logic
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    await User.create({ username, password });
    res.redirect("/auth/login");
  } catch (err) {
    res.send("Signup error: " + err.message);
  }
});

// Login Page
router.get("/login", (req, res) => {
  res.render("login");
});

// Login Logic
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (!user) {
    return res.send("Invalid credentials");
  }
  res.redirect("/");
});

module.exports = router;
