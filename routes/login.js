const express = require("express");
const { v4: uuidv4 } = require("uuid");
const loginroute = express.Router();
const { setuser } = require("../services/auth");
const UserLogin = require("../model/login");
console.log("jg");

//login page
loginroute.get("/", async (req, res) => {
  return res.render("login");
});
//signup page process
loginroute.get("/process", async (req, res) => {
  // console.log(req.params.email);
  console.log(req);

  const { name, email, password } = req.query;
  console.log(name, email, password);

  if (!name || !password || !email) {
    return res.render("signup", { message: "Fill the each row", t: 1 });
  }
  const a = await UserLogin.findOne({ email: email });
  if (a) {
    return res.render("signup", { message: "Email Already Exist", t: 1 });
  }
  await UserLogin.create({
    firstname: name,
    email: email,
    password: password,
  });

  return res.render("login");
});
//login form handling
loginroute.post("/", async (req, res) => {
  const data = req.body;
  if (!data || !data.firstname || !data.email || !data.password) {
    return res.status(404).json({ message: "invalid user" });
  }
  console.log(data);

  const a = await UserLogin.findOne({ email: data.email });
  console.log(a);

  if (!a) {
    console.log("do");

    const number = 0;
    return res.render("login", { number: number });
  }
  if (a.password != data.password) {
    console.log(a.password, " ", data.password);

    const number = 0;
    return res.render("login", { number: number });
  }
  //jwt tokens

  const jwttoken = setuser(a);
  res.cookie("jwt", jwttoken);
  return res.render("home");
});

//sign up handling
loginroute.get("/signup", async (req, res) => {
  return res.render("signup");
});

module.exports = loginroute;
