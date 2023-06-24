const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username:{type:String, required:true},
    email:{type:String,required:true},
    password:{type:String, required:true}
})
userSchema.methods.comparePasswords = async function(password){
    console.log("from schema file");
    console.log(password+" "+this.password)
    try {
        console.log("entered try block");
        console.log(password==this.password);
        return await password==this.password;
      } catch (error) {
        console.log("entered catch block")
        throw new Error(error);
      }
}
module.exports = mongoose.model("userModel",userSchema);