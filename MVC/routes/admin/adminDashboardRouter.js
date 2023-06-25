const express = require("express")
const router = express.Router();
const adminDashboardController = require("../../controller/admin/adminDashboardController")
router.get("/",adminDashboardController.adminDashboard) 
router.post("/",adminDashboardController.adminDashboardAddCentre)
module.exports = router;
// router.post("/",adminDashboardController.adminDashboard)  