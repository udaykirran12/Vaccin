const express = require("express")
const router = express.Router();
const adminDashboardController = require("../../controller/admin/adminDashboardController")

const auth = (req,res,next)=>{
    if(req.session.adminAuth){
        next()
    }
    else{
        res.render('adminLogin')
    }
}
router.get("/",auth, adminDashboardController.adminDashboard) 
router.post("/",auth, adminDashboardController.adminDashboardAddCentre)
module.exports = router;
// router.post("/",adminDashboardController.adminDashboard)  