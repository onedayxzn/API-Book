const express = require("express");
const router = express.Router();
const borrowController = require("../controller/borrow");

router.route("/borrow").get(borrowController.showBorrow);

router.post("/borrow/:code_member", borrowController.borrowBook);
router.post("/borrow/return/:code_member", borrowController.bookReturn);

module.exports = router;
