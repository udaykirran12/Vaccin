const mongoose = require("mongoose")
const express = require("express")
const User = require("../../models/userSchema")
exports.showPage = (req,res)=>{
    res.render('userSignup')
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
        const entry = await newUser.save();
        res.render("userLogin")
    }catch(error){
        res.send(error);
    }
}