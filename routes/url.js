const express = require("express");
const { nanoid } = require("nanoid");
const user = require("../model/url");

const urlroutes = express.Router();

// Show URL shortener form
urlroutes.get("/", (req, res) => {
  res.render("home");
});

// Create short URL
urlroutes.post("/data", async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.render("home", { message: "Please enter a URL" });

    const shortid = nanoid(6);
    await user.create({
      shortid,
      redirectURL: url,
      vistorhistory: [],
    });

    res.render("home", { shortid });
  } catch (err) {
    res.render("home", { message: "Error creating short URL" });
  }
});

// Analytics
urlroutes.get("/data/:shortid", async (req, res) => {
  const record = await user.findOne({ shortid: req.params.shortid });
  if (!record) return res.render("home", { message: "Short URL not found" });

  res.render("analytics", {
    shortid: req.params.shortid,
    clicks: record.vistorhistory.length,
  });
});

// Redirect
urlroutes.get("/:shortid", async (req, res) => {
  const record = await user.findOne({ shortid: req.params.shortid });
  if (!record) return res.render("home", { message: "URL not found" });

  record.vistorhistory.push({ timestamp: Date.now() });
  await record.save();

  res.redirect(record.redirectURL);
});

module.exports = urlroutes;
