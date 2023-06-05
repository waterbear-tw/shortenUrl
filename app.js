const express = require("express");
const exphbs = require("express-handlebars");
const app = express();

//引入路由
const routes = require("./routes");
app.use(routes);

//引入 mongoDB
require("./config/mongoose");

//exphbs setting
app.engine("hbs", exphbs.engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");
app.use(express.static("public"));

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
