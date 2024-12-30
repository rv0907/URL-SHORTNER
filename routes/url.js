const express = require("express");
const urlroutes = express.Router();
const user = require("../model/url");
const { nanoid } = require("nanoid"); // Import nanoid directly

// Route to create a new short URL
urlroutes.get("/", (req, res) => {
  return res.render("home");
});
urlroutes.post("/data", async (req, res) => {
  try {
    const userdata = req.body;
    if (!userdata || !userdata.url) {
      return res.status(400).json({ message: "Invalid URL" });
    }

    const ids = nanoid(); // Generate a unique short ID
    const newURL = await user.create({
      shortid: ids,
      redirectURL: userdata.url,
      vistorhistory: [], // Initialize with an empty array
    });
    console.log(ids);

    return res.status(200).render("home", { id: ids }); // Send back the short ID
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

    res.status(200).send({ totalclicks: data.vistorhistory.length });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
});
let t = 0;
// Route to redirect to the original URL based on the short ID
urlroutes.get("/:id", async (req, res) => {
  console.log("l");
  console.log(req.params);
  // console.log(req);
  const urll = await user.findOne({ shortid: req.params.id });
  console.log(urll);

  if (!urll) {
    return res.status(404).json({ message: "URL not found" });
  }

  const time = Date.now();
  urll.vistorhistory.push({ timestamp: time }); // Store the timestamp
  await urll.save(); // Save the updated visitor history
  console.log("hd");
  console.log(urll.redirectURL);

  return res.redirect(urll.redirectURL);
  // Redirect to the original URL
});

module.exports = urlroutes;
