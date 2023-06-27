const express = require("express")
const router = express.Router()
const userRegisterController = require('../../controller/user/userRegisterController')
router.post('/',userRegisterController.userRegister)
router.get('/',userRegisterController.showPage)
module.exports = router  