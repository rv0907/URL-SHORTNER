const express = require("express");
const { v4: uuidv4 } = require("uuid");
const loginroute = express.Router();
const { setuser } = require("../services/auth");
const UserLogin = require("../model/login");

// login page
loginroute.get("/", async (req, res) => {
  return res.json({ message: "Login API is working" });
});

// signup page process
loginroute.get("/process", async (req, res) => {
  const { name, email, password } = req.query;

  if (!name || !password || !email) {
    return res.status(400).json({ message: "Fill each row" });
  }

  const existing = await UserLogin.findOne({ email: email });
  if (existing) {
    return res.status(400).json({ message: "Email already exists" });
  }

  await UserLogin.create({
    firstname: name,
    email: email,
    password: password,
  });

  return res.json({ message: "User created successfully" });
});

// login form handling
loginroute.post("/", async (req, res) => {
  const data = req.body;
  if (!data || !data.firstname || !data.email || !data.password) {
    return res.status(400).json({ message: "Invalid user data" });
  }

  const user = await UserLogin.findOne({ email: data.email });
  if (!user || user.password !== data.password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const jwttoken = setuser(user);
  res.cookie("jwt", jwttoken);

  return res.json({ message: "Login successful", token: jwttoken });
});

// signup form
loginroute.get("/signup", async (req, res) => {
  return res.json({ message: "Signup API is working" });
});

module.exports = loginroute;
