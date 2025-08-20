const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");
const Url = require("../models/url");

// Create Short URL
router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;
  if (!longUrl) return res.send("Please provide a URL");

  const shortId = nanoid(6);
  const shortUrl = `${req.protocol}://${req.get("host")}/${shortId}`;

  await Url.create({ longUrl, shortId, shortUrl });

  res.render("home", { shortUrl });
});

// Redirect short URL
router.get("/:shortId", async (req, res) => {
  const { shortId } = req.params;
  const url = await Url.findOne({ shortId });

  if (!url) return res.status(404).send("URL not found");
  res.redirect(url.longUrl);
});

module.exports = router;
