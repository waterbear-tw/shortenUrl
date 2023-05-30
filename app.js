const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const app = express();
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
mongoose.connect(process.env.MONGODB_URI);

//mongoDB connection setting
const db = mongoose.connection;
db.on("error", () => {
  console.log("mongodb error.");
});
db.once("open", () => {
  console.log("mongodb connected.");
});

//exphbs setting
app.engine("hbs", exphbs.engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(3000, () => {
  console.log("Sever on.");
});
