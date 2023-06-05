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

//啟動伺服器
app.listen(3000, () => {
  console.log("Sever is now running on 'http://localhost:3000/' .");
});
