const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const adminSchema = new mongoose.Schema({
    username:{type:String, required:true},
    password:{type:String,required:true}
})
// adminSchema.pre("save", async function (next) {
//     try {
//       // Generate a salt for hashing 
//       const salt = await bcrypt.genSalt(10);
//       // Hash the password using the generated salt
//       const hashedPassword = await bcrypt.hash(this.password, salt);
//       // Replace the plain text password with the hashed password
//       this.password = hashedPassword;
//       next();
//     } catch (error) {
//       next(error);
//     }
//   });
  
adminSchema.methods.comparePasswords = async function (password) {
    try {
      return await password===this.password;
    } catch (error) {
      throw new Error(error);
    }
};
   
module.exports = mongoose.model("AdminModel",adminSchema);