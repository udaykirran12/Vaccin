const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
const adminSchema = new mongoose.Schema({
    username:{type:String, required:true},
    password:{type:String,required:true }
});
  
adminSchema.methods.comparePasswords = async function (password) {
  console.log("comparing passwords");
    try {
      return await password==this.password;
    } catch (error) {
      console.log(this.password);
      throw new Error(error);
    }
};
   
module.exports = mongoose.model("AdminModel",adminSchema);