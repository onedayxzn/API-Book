const express = require("express");
const router = express.Router();
const bookController = require("../controller/book");

router
  .route("/book")
  .get(bookController.showBook)
  .post(bookController.addBook)
  .put(bookController.addStock);

module.exports = router;
