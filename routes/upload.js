const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/uploads"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

// Upload form
router.get("/", (req, res) => {
  res.render("upload");
});

// Upload logic
router.post("/", upload.single("profileimage"), (req, res) => {
  res.send("File uploaded successfully: " + req.file.filename);
});

module.exports = router;
