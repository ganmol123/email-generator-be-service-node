const express = require("express");
const router = express.Router();

const email = require("../../controllers/email.controller");

router.post("/generate", email.generate_email);

module.exports = router;
