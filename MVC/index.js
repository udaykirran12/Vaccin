require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const app = express(); 
app.use(express.json());
const staticPath = path.join(__dirname, "public");
// console.log(staticPath);
app.use(express.static(staticPath));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));

const PORT = process.env.PORT || 3000;
const url = "mongodb+srv://udayAdmin:udayAdmin@cluster0.lsekvay.mongodb.net/"
// const url = "mongodb+srv://udayAdmin:<password>@cluster0.lsekvay.mongodb.net/Node-API?retryWrites=true&w=majority";
// const url = "mongodb+srv://udayAdmin:udayAdmin@cluster0.lsekvay.mongodb.net/Node-API?retryWrites=true&w=majority";
// const url = "mongodb://localhost:27017";
mongoose.connect(url).then(()=>{
    console.log("db connected");
    app.listen(PORT,()=>{
        console.log("server started");
    }) 
})
app.get('/', (req,res)=>{
    res.render("HomePage");
})
app.get('/login', (req,res)=>{
    res.render("loginPage");
})
const slotBookRouter = require('./routes/user/slotBookRouter')
app.use('/bookSlot',slotBookRouter)

const addCentreRouter = require('./routes/admin/addCentreRouter')
app.use('/handleCentre', addCentreRouter)

const userRegisterRouter = require("./routes/user/userRegisterRouter")
app.use('/userRegister', userRegisterRouter)

const userLoginRouter = require("./routes/user/userLogInRouter")
app.use('/userLogin', userLoginRouter)

const adminLoginRouter = require("./routes/admin/adminLoginRouter")
app.use('/adminLogin', adminLoginRouter) 

const adminUpdateRouter = require("./routes/admin/adminUpdateCentreRouter")
app.use('/adminLogin/adminDashboard/updateCentre', adminUpdateRouter)

const adminDashboardRouter = require("./routes/admin/adminDashboardRouter")
app.use('/adminLogin/adminDashboard',adminDashboardRouter)

const adminSearchRouter = require("./routes/admin/adminSearchRouter")
app.use('/adminLogin/adminDashboard/adminSearch', adminSearchRouter)
// app.use('/adminLogin/adminDashboard/adminSearch', adminSearchRouter)
