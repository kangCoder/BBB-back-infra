const express = require("express");
const multer = require("multer");
const fs = require("fs");

const app = express();

fs.readdir("uploads", (err) => {
  if (err) {
    fs.mkdirSync("uploads");
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("img");
app.post("/api/upload", upload, (req, res, next) => {
  res.status(201).send({
    result: true,
    fileInfo: req.file,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening at PORT=${PORT}`);
});
