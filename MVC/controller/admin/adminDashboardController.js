const mongoose = require("mongoose");
const path = require("path");
const viewPath  = path.join(__dirname,"../../views");
const modelsPath = path.join(__dirname,"../../models");
const express = require("express");
const app = express();
app.use(express.json());
const Centre = require(modelsPath+"/centreSchema");
 
exports.adminDashboard = async(req,res)=>{
    const filePath = path.join(viewPath,"./adminDashboard.ejs");
    const centreList = [];
    const centres = await Centre.find({},"name address");
    for(let i=0;i<centres.length;i++){
        const obj = {
            name: centres[i].name,
            address:centres[i].address
        }
        centreList.push(obj);
    }
    res.render(filePath,{list:centreList});
}
exports.adminDashboardAddCentre = async(req,res)=>{
    console.log(req.body.name);
    console.log(req.body.address);
    const newCentre = new Centre({
        name: req.body.name,
        address:req.body.address
    })
    try{
        const entry = await newCentre.save(); 
        res.redirect("/adminLogin/adminDashboard");
    }
    catch(error){
        res.send(error);
    }
}

exports.adminSearch = async (req, res) => {
    const searchString = req.body.search; // Assuming the form field name is 'search'
  
    try {
      // Search for centres matching the search query
      const centres = await Centre.find({},"name address");
      const list = [];
      for(let i = 0; i<centres.length;i++){
        list.push(centres[i].address);
      } 
      const filteredList = list.filter((address) => {
        return address.toLowerCase().includes(searchString.toLowerCase());
      });
      
      
    } catch (error) {
      res.send(error);
    }
  };
  

module.exports = exports