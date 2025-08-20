const express = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const uploadRouter = express.Router();

// Define the upload directory
const uploadDir = path.join(__dirname, "uploads");

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Use the verified directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// Initialize the upload middleware
const upload = multer({ storage: storage });

// Route to test API
uploadRouter.get("/", (req, res) => {
  return res.json({ message: "Upload API is working" });
});

// Route to handle the file upload
uploadRouter.post("/", upload.single("profileimage"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  return res.json({
    message: "File uploaded successfully",
    fileName: req.file.filename,
  });
});

module.exports = uploadRouter;
