const express = require("express");
const urlroutes = express.Router();
const user = require("../model/url");
const { nanoid } = require("nanoid");

// Route to create a new short URL
urlroutes.get("/", (req, res) => {
  return res.json({ message: "URL Shortener API is working" });
});

urlroutes.post("/data", async (req, res) => {
  try {
    const userdata = req.body;
    if (!userdata || !userdata.url) {
      return res.status(400).json({ message: "Invalid URL" });
    }

    const ids = nanoid(); // Generate a unique short ID
    await user.create({
      shortid: ids,
      redirectURL: userdata.url,
      vistorhistory: [],
    });

    return res.status(200).json({ message: "Short URL created", id: ids });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
});

// Route to fetch analytics data (click count)
urlroutes.get("/data/:shortid", async (req, res) => {
  try {
    const idd = req.params.shortid;
    const data = await user.findOne({ shortid: idd });

    if (!data) {
      return res.status(404).json({ message: "Short URL not found" });
    }

    res.status(200).json({ totalclicks: data.vistorhistory.length });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
});

// Route to redirect to the original URL based on the short ID
urlroutes.get("/:id", async (req, res) => {
  const urll = await user.findOne({ shortid: req.params.id });

  if (!urll) {
    return res.status(404).json({ message: "URL not found" });
  }

  const time = Date.now();
  urll.vistorhistory.push({ timestamp: time });
  await urll.save();

  return res.json({
    message: "Redirecting to original URL",
    redirectURL: urll.redirectURL,
  });
});

module.exports = urlroutes;
