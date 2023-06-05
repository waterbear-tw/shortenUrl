const express = require("express");
const router = express.Router();
const Url = require("../../models/url");
const bodyParser = require("body-parser");
const postfixGenerator = require("../../functions/postfixGenerator"); //引入產生後綴的fnction
//設定
router.use(bodyParser.urlencoded({ extended: true }));

//route: index page
router.get("/", (req, res) => {
  return res.render("index");
});

//set route POST /new
router.post("/new", (req, res) => {
  const requrl = req.body.url; //傳回要縮短的目標網址
  const protocol = req.protocol;
  const host = req.get("host");

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
        res.render("new", { url: url[0], protocol, host });
      } else {
        //目標網址第一次被縮短，產生對應的後綴碼
        const postfix = postfixGenerator();
        //將網址和後綴碼存回資料庫
        return Url.create({ url: requrl, postfix })
          .then(() => {
            //直接把輸入資料送到渲染夜面
            res.render("new", {
              url: { url: requrl, postfix: postfix },
              protocol,
              host,
            });
          })
          .catch((error) => console.error(error));
      }
    })
    .catch((error) => {
      console.error(error);
    });
});

//route: redirect to real website
router.get("/:postfix", (req, res) => {
  const postfix = req.params.postfix;
  if (postfix.length === 0) {
    return;
  }
  Url.find({ postfix })
    .lean()
    .then((url) => {
      res.redirect(url[0].url);
    })
    .catch((error) => console.error("route not found:", postfix, "\n", error));
});

module.exports = router;
