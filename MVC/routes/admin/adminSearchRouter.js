const express = require("express")
const router = express.Router();
const adminDashboardController = require("../../controller/admin/adminDashboardController")
router.post('/',adminDashboardController.adminSearch)
module.exports = router