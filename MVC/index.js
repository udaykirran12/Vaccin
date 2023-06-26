require('dotenv').config()
//session modules down
const express = require("express");
const session = require("express-session")
const mongodbSession = require("connect-mongodb-session")(session)
//session modules up
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
const store = new mongodbSession({
    uri:url,
    collection:'mySession'
})
app.use(session({
    secret: 'key',
    resave:false,
    saveUninitialized:false,
    store:store,
}))
const auth = (req,res,next)=>{
    if(req.session.isAuth){
        next()
    }
    else{
        res.redirect('/homepage')
    }
}
app.get('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        if(err)throw err;
        else res.redirect('/');
    })
})
app.get('/', (req,res)=>{
    res.render("HomePage");
})
app.get('/login', (req,res)=>{ 
    res.render("loginPage");
})
app.get('/vac', auth, (req, res) => {
    const { list, error } = req.query;
  
    // Parsing the query parameters
    const decodedList = JSON.parse(decodeURIComponent(list));
    const decodedError = decodeURIComponent(error);
  
    // Render the 'vac' template with the retrieved data
    res.render('vac', { list: decodedList, error: decodedError });
});

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
