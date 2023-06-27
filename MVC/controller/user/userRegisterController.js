const mongoose = require("mongoose")
const express = require("express")
const User = require("../../models/userSchema")
exports.showPage = (req,res)=>{
    res.render('userSignup',{error:""});
}
exports.userRegister = async(req,res)=>{
    console.log(req.body)
    const newUser = new User(
        {
            username:req.body.username,
            email:req.body.email,
            password:req.body.password
        }
    )
    try{
        const exist = await User.findOne({username:req.body.username})
        if(exist){
            res.render('userSignup',{error:"Username already exists"});
        }
        else{
            const entry = await newUser.save();
            res.render("userLogin")
        }
    }catch(error){
        res.redirect('/userRegister');
    }
}


