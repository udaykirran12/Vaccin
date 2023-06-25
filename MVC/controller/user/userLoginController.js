const mongoose = require("mongoose")
const Users = require("../../models/userSchema")
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
        // console.log(oldUser.password+" "+userEntry.password);
        if(oldUser && await oldUser.comparePasswords(userEntry.password)){
            // res.send("login successful");
            console.log("login successful");
            // res.render(viewPath+"/admin/views/adminDashboard.ejs",{list:centreList});
            res.render("vac");
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

