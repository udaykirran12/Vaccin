const mongoose = require("mongoose");
const Admin = require("../../models/adminSchema");
const express = require("express");
const session = require("express-session");
const mongodbSession = require("connect-mongodb-session")(session);

exports.showLoginPage = async(req,res)=>{
    console.log("entered show login page");
    try {
        console.log("entered show login page try block");
        const admins = await Admin.find({}).exec();
        console.log(admins+" "+admins.length)
        for (let i = 0; i < admins.length; i++) {
          console.log(admins[i].username + " " + admins[i].password);
        }
    }catch(error){
        res.send(error)
    }
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
        // console.log("entered try block");
        const oldAdmin = await  Admin.findOne({username:admin.username})
        // console.log("correct password: "+oldAdmin.password)
        if(oldAdmin && await oldAdmin.comparePasswords(admin.password)){
            req.session.adminAuth = true
            req.session.adminName = req.body.username
            res.redirect('/adminLogin/adminDashboard');
        }
        else{
            // console.log("correct password: "+oldAdmin.password);
            console.log("wrong details");
            res.render('adminLogin');
        }
    }
    catch(err){
        res.send('err'); 
    }
}
