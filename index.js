const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const response = require("./response");
const bookRouter = require("./router/book");
const memberRouter = require("./router/member");
const borrowRouter = require("./router/borrow");

app.use(bodyParser.json());

var mylogger = function (req, res, next) {
  console.log("LOGGED");
  next();
};

app.use(mylogger);

app.get("/", (req, res) => {
  response(200, [], "Hello World", res);
});

app.use(bookRouter);
app.use(memberRouter);
app.use(borrowRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
