const mongoose = require("mongoose");
const path = require("path");
const viewPath  = path.join(__dirname,"../../views");
const modelsPath = path.join(__dirname,"../../models");
const Admin = require(modelsPath+"/adminSchema");
 
exports.showLoginPage = async(req,res)=>{
    res.render("adminLogin"); 
} 
exports.adminLogin = async (req,res)=>{
    console.log("adminlogin")
    const admin = new Admin({
        username : req.body.username,
        password : req.body.
        password
    })
    console.log((admin.username)+" "+(admin.password));
    try{
        console.log("entered try block")
        const oldAdmin = await  Admin.findOne({username:admin.username})
        if(oldAdmin && await oldAdmin.comparePasswords(admin.password)){
            console.log("login successful");
            res.redirect('/adminLogin/adminDashboard');
        }
        else{
            console.log("wrong details");
            res.render('adminLogin');
        }
    }
    catch(err){
        res.send(err); 
    }
}
