const Url = require("./models/url"); //載入Url Model

const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");

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
app.use(express.static("images"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

//set route POST /new
app.post("/new", (req, res) => {
  const requrl = req.body.url; //傳回要縮短的目標網址
  //輸入資料為空時提示使用者
  if (requrl.length === 0) {
    console.log("輸入網址不得為空字串。");
    return res.redirect("/");
  }

  Url.find({ url: requrl })
    .lean()
    .then((url) => {
      //判斷目標網址是否存在資料庫中
      if (url.length !== 0) {
        console.log(url);
        res.render("new", { url: url[0] });
      } else {
        //目標網址第一次被縮短，產生對應的後綴碼
        const postfix = postfixGenerator();
        //將網址和後綴碼存回資料庫
        return Url.create({ url: requrl, postfix })
          .then(() => {
            //直接把輸入資料送到渲染夜面
            res.render("new", { url: { url: requl, postfix: postfix } });
          })
          .catch((error) => console.error(error));
      }
    })
    .catch((error) => {
      console.error(error);
    });
});

//route GET /new
app.get("/new", (req, res) => {
  Url.find()
    .lean()
    .then((url) => {
      res.render("new", { url });
    })
    .catch((error) => console.error(error));
});

app.listen(3000, () => {
  console.log("Sever on.");
});

function postfixGenerator() {
  const lowercaseAlph = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  const uppercaseAlpha = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const charList = lowercaseAlph.concat(uppercaseAlpha).concat(numbers); //拼接字典陣列，保留修改的彈性

  let result = [];
  for (let i = 0; i !== 5; i++) {
    const total = charList.length;
    const index = Math.ceil(Math.random() * total + 1) - 1;
    result.push(charList[index]);
  }

  const postfix = result.join("");
  return postfix;
}
