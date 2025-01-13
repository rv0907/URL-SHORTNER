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

// Route to render the file upload form
uploadRouter.get("/", (req, res) => {
  return res.render("files");
});

// Route to handle the file upload
uploadRouter.post("/", upload.single("profileimage"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }
  // Render the "files" view with upload confirmation
  return res.render("files", { fileName: req.file.filename });
});

module.exports = uploadRouter;
