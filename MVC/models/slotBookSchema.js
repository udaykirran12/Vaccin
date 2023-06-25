const mongoose = require("mongoose")
const slotSchema = mongoose.Schema({
    id: {type:Number, required:true},
    date:{type:Date,required:true},
    doses:{type:Date,required:true},
    username:{type:String,required:true}
})
