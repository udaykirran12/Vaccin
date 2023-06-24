const express = require("express")
const router = express.Router()
const handleCentreController = require('../../controller/admin/adminDashboardController')

router.get("/", handleCentreController.showAddCentre)//form
router.post("/",handleCentreController.adminDashboardDeleteCentre)//deleting centre

module.exports  = router