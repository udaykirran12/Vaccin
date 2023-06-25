const mongoose = require("mongoose")
const express = require("express")
const session = require("express-session")
const mongodbSession = require("connect-mongodb-session")(session)
const Users = require("../../models/userSchema")
const Centre = require("../../models/centreSchema")
exports.showLoginPage = async (req,res)=>{
    try {

        const users = await Users.find({}).exec();
        console.log("loginpage try block "); 
        console.log(users+" "+users.length);
        for (let i = 0; i < users.length; i++) {
          console.log(users[i].username + " " + users[i].password);
        }
      } catch (error) {
        console.error(error);
      }
    res.render("userLogin")
} 
exports.userLogin = async (req,res) => {
    console.log("userlogin")
    const userEntry = new Users({
        username : req.body.username,
        email: req.body.email,
        password : req.body.password
    })
    console.log((userEntry.email)+" "+(userEntry.password));
    try{ 
        console.log("entered try block")
        const oldUser = await Users.findOne({email:userEntry.email})
        if(oldUser && await oldUser.comparePasswords(userEntry.password)){
            const centreList = [];
            const centres = await Centre.find({});
            for(let i=0;i<centres.length;i++){
                const obj = {
                    id: centres[i].id,
                    name: centres[i].name,
                    address:centres[i].street+" "+centres[i].district+" "+centres[i].state,
                    doses:centres[i].doses
                }
                centreList.push(obj);
            }
            // console.log(centreList)
            req.session.isAuth = true;
            req.session.username = await Users.findOne({email:req.body.email},'username')
            const queryObject = {
                list: JSON.stringify(centreList),
                error: ''
            }; 
            const queryString = '?'+querystring.stringify(queryObject);
            res.redirect('/vac'+queryString); // Redirect to /vac with query parameters        
            // res.render("vac",{list:centreList, error:""});
            // write your redirect code here
        }
        else{
            // alert("incorrect details, Try Again")
            res.render("userLogin");
        }
    }
    catch(err){ 
        res.send(err); 
    }
}


