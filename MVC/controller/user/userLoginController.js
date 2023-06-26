const mongoose = require("mongoose");
const express = require("express");
const session = require("express-session");
const mongodbSession = require("connect-mongodb-session")(session);
const Users = require("../../models/userSchema");
const Centre = require("../../models/centreSchema");
const querystring = require("querystring");
exports.showLoginPage = async (req, res) => {
  if(req.session.isAuth){
      const centres = await Centre.find({});
      let centreList=[]
      for (let i = 0; i < centres.length; i++) {
        const obj = {
          id: centres[i].id,
          name: centres[i].name,
          address: 
            centres[i].street + " " + centres[i].district + " " + centres[i].state,
          doses: centres[i].doses,
          workingHours : centres[i].workingHours
        };
        centreList.push(obj);
      }
      const queryObject = {
        list: JSON.stringify(centreList),
        error: ""
      };
      const queryString = "?" + querystring.stringify(queryObject);
      res.redirect("/vac" + queryString);
  }
  else
  res.render('userLogin');
}
exports.userLogin = async (req, res) => {
  console.log("userlogin");
  const userEntry = new Users({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });
  console.log(userEntry.email + " " + userEntry.password);
  try {
    console.log("entered try block");
    const oldUser = await Users.findOne({ email: userEntry.email });
    let centreList=[]
    if (oldUser && (await oldUser.comparePasswords(userEntry.password))) {
      const centres = await Centre.find({});
      for (let i = 0; i < centres.length; i++) {
        const obj = {
          id: centres[i].id,
          name: centres[i].name,
          address: 
            centres[i].street + " " + centres[i].district + " " + centres[i].state,
          doses: centres[i].doses,
          workingHours : centres[i].workingHours
        };
        centreList.push(obj);
      }
      req.session.isAuth = true;
      req.session.username = await Users.findOne(
        { email: req.body.email },
        "username"
      );

      const queryObject = {
        list: JSON.stringify(centreList),
        error: ""
      };
      const queryString = "?" + querystring.stringify(queryObject);
      console.log(queryString);
      res.redirect("/vac" + queryString);
    } else {
      res.render("userLogin");
    }
  } catch (err) {
    res.send(err);
  }
};
