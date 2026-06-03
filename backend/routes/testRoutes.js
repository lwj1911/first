const testController = require("../controllers/testController");
const express = require("express");
const router = express.Router();
router.post("/", testController.createTest);
module.exports = router;