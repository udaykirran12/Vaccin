const mongoose = require("mongoose")
const slotSchema = mongoose.Schema({
    id: {type:Number, required:true},
    date:{type:Date,required:true},
    username:{type:String,required:true}
})

slotSchema.methods.add = async (id,date,username)=>{
    try{
        const newSlot = slotSchema({id,date,username});
        newSlot.save()
    }
    catch(err){
        
        res.render('/vac', {})
    }
}

module.exports = mongoose.model("slotBookModel", slotSchema);

