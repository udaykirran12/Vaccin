const express = require("express")
const router = express.Router()
const userLoginController = require("../../controller/user/userLoginController")
router.post('/', userLoginController.userLogin)
router.get('/',userLoginController.showLoginPage)
module.exports = router  