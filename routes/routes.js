const express = require("express");
const emailRouter = require("./v1/email.route");

const router = express.Router();

// Email-Service endpoint
router.use("/email", emailRouter);

module.exports = router;
