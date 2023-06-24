const express = require("express");
const router = express.Router();
const adminLoginController = require("../../controller/admin/adminLoginController")

router.get("/",adminLoginController.showLoginPage)
router.post("/",adminLoginController.adminLogin)

module.exports = router;  