const mongoose = require("mongoose")
const dateScheme = mongoose.Schema({
    date: {type:Date, required:true},
    dosages:{type:Number,required:true}
})

module.exports = mongoose.model("dataModel", dataScheme);
