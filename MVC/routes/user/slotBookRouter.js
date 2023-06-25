const express = require("express")
const router  = express.Router()
const slotBookController = require("../../controller/user/slotBookController")
router.post('/',slotBookController.bookSlot)
module.exports = router  