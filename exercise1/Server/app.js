const express = require("express");
const multer = require("multer");
const fs = require("fs");

const app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
app.use("/api", express.static("uploads"));

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

app.get("/api", (req, res) => {
  res.render("index");
});
app.post("/api/upload", upload, (req, res, next) => {
  console.log(req.file.filename);
  res.redirect(req.file.filename);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening at PORT=${PORT}`);
});
