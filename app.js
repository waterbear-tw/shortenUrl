const express = require("express");
const exhbs = require("express-handlebars");
const mongoose = require("mongoose");
const app = express();
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;
db.on("error", () => {
  console.log("mongodb error.");
});
db.once("open", () => {
  console.log("mongodb connected.");
});

app.get("/", (req, res) => {
  res.send("Hi");
});

app.listen(3000, () => {
  console.log("Sever on.");
});
