const mongoose = require("mongoose");
const centreSchema = new mongoose.Schema({
    name:{type:String, required:true},
    address:{type:String,required:true}
})
module.exports = mongoose.model("centreSchema",centreSchema)