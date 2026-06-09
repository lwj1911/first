const testController = require("../controllers/testController")
const express = require("express")
const router = express.Router()

router.post("/",testController.onTest)

module.exports = router