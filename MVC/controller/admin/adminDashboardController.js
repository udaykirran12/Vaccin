const mongoose = require("mongoose");
const express = require("express");
const path = require("path");

const viewPath  = path.join(__dirname,"../../views");
const modelsPath = path.join(__dirname,"../../models");
const Centre = require(modelsPath+"/centreSchema");

const app = express();
app.use(express.json());

 
exports.adminDashboard = async(req,res)=>{
    console.log("dashboard entered");
    const centreList = [];
    const centres = await Centre.find({});
    for(let i=0;i<centres.length;i++){
        const obj = {
            id: centres[i].id,
            name: centres[i].name,
            address:centres[i].street+" "+centres[i].district+" "+centres[i].state,
            doses:centres[i].doses,
            workingHours:centres[i].workingHours
        }
        centreList.push(obj);
    }
    res.render("adminDash",{list:centreList});
}
exports.adminDashboardAddCentre = async(req,res)=>{
    console.log("adding called with "+req.body)
    console.log(req.body.id+" "+req.body.name+" "+req.body.street+" "+req.body.district+" "+req.body.state)
    const newCentre = new Centre({
        id: req.body.id,
        name: req.body.name,
        street:req.body.street,
        district:req.body.district,
        state:req.body.state,
        doses:0,
        workingHours:req.body.workingHours
    })
    try{
        const entry = await newCentre.save(); 
        res.render("addVaccine",{error:"New Centre Added Successfully"});
    }
    catch(error){
        if(error.code===11000){
          res.render("addVaccine",{error:"Hospital ID already exists"})
        }
        else res.send(error)
    }
}

// from addCentreRouter
exports.showAddCentre = async (req,res)=>{
  res.render("addVaccine",{error:""})
};
exports.adminDashboardDeleteCentre = async (req, res) => {
  const id = req.body.id;
  try {
      const centre = await Centre.findOne({ id: id });
      if(centre){
        await Centre.deleteOne({ id: id });
      }
      return res.redirect('/adminLogin/adminDashboard')
  } catch (error) {
      res.status(500).json({ message: "Error deleting center", error: error });
  }
};


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