const express = require("express")
const router = express.Router()
const userReisterController = require('../../controller/user/userRegisterController')
router.post('/',userReisterController.userRegister)
router.get('/',userReisterController.showPage)
module.exports = router 