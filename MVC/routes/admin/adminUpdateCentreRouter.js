const express = require("express")
const router = express.Router()
const updateCentreController = require("../../controller/admin/updateCentreController")

router.get('/', updateCentreController.showUpdatePage)
router.post('/', updateCentreController.handleUpdateCentre)

module.exports = router 