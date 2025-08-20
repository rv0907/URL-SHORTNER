const express = require("express");
const multer = require("multer");
const path = require("path");

const uploadRouter = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// Upload form
uploadRouter.get("/", (req, res) => {
  res.render("files");
});

// Handle upload
uploadRouter.post("/", upload.single("profileimage"), (req, res) => {
  if (!req.file) return res.render("files", { message: "No file uploaded" });
  res.render("files", { message: "File uploaded!", fileName: req.file.filename });
});

module.exports = uploadRouter;
