const express = require("express");
const { setuser } = require("../services/auth");
const UserLogin = require("../model/login");

const loginroute = express.Router();

// Login page
loginroute.get("/", (req, res) => {
  res.render("login");
});

// Signup page
loginroute.get("/signup", (req, res) => {
  res.render("signup");
});

// Signup process
loginroute.get("/process", async (req, res) => {
  const { name, email, password } = req.query;

  if (!name || !email || !password) {
    return res.render("signup", { message: "Fill in all fields" });
  }

  const existing = await UserLogin.findOne({ email });
  if (existing) {
    return res.render("signup", { message: "Email already exists" });
  }

  await UserLogin.create({ firstname: name, email, password });
  return res.render("login", { message: "Signup successful! Please login." });
});

// Login process
loginroute.post("/", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserLogin.findOne({ email });
  if (!user || user.password !== password) {
    return res.render("login", { message: "Invalid email or password" });
  }

  const jwttoken = setuser(user);
  res.cookie("jwt", jwttoken);
  return res.render("home", { user });
});

module.exports = loginroute;
