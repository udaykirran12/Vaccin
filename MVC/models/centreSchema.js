const mongoose = require("mongoose");
const centreSchema = new mongoose.Schema({
    id:{type: Number, required:true,unique: true},
    name: {type: String, required:true},
    street:{type:String,required:true},
    district:{type:String,required:true},
    state:{type:String,required:true},
    doses:{type:Number,required:true},
    workingHours:{type:String,required:true}
})

// centreSchema.methods.getList = async ()=>{
//     const centreList = [];
//     try{
//         const centres = await Centre.find({});
//         console.log("from schema "+centres)
//         for(let i=0;i<centres.length;i++){
//             const obj = {
//                 id: centres[i].id,
//                 name: centres[i].name,
//                 address:centres[i].street+", "+centres[i].district+", "+centres[i].state,
//                 doses:centres[i].doses
//             }
//             centreList.push(obj);
//         }
//         return await centreList;
//     }
//     catch(err){
//         res.send(err)
//     }
// }
module.exports = mongoose.model("centreSchema",centreSchema) 