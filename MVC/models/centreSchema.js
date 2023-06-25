const mongoose = require("mongoose");
const centreSchema = new mongoose.Schema({
    id:{type: Number, required:true,unique: true},
    name: {type: String, required:true},
    street:{type:String,required:true},
    district:{type:String,required:true},
    state:{type:String,required:true},
    doses:{type:Number,required:true}
})
module.exports = mongoose.model("centreSchema",centreSchema) 