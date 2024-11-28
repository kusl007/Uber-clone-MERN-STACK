const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
        type:String, 
        required:true,
        minlength:[3,'First name must be at least 3 characters long']
    },
    lastname: {
        type:String, 
        minlength:[3,'Last name must be at least 3 characters long']
    }
      },
  email: {
     type: String,
      required: true,
      unique: true,
      minlength: [5, "Email must be at least 5 characters long"],
     },
  password: {
     type: String, 
     required: true,
     select:false 
     },
     socketId:{
        type:String,

     }
 
});

userSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id},process.env.JWT_SECRET_KEY,{expiresIn:"24h"});
    return token;

}

userSchema.methods.comparePassword=async function(plainPassword){
    return await bcrypt.compare(plainPassword,this.password);
}

userSchema.statics.hashPassword=async function(plainPassword){
    return await bcrypt.hash(plainPassword,10);
}

const userModel=mongoose.model("user",userSchema);
module.exports=userModel;
