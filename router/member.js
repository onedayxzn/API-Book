const express = require("express");
const router = express.Router();
const memberController = require("../controller/member");

router
  .route("/member")
  .get(memberController.showMember)
  .post(memberController.addMember);

module.exports = router;
