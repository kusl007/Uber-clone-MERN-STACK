const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blackListTokenModel=require("../models/blackListToken.model.js");


module.exports.authUser=async(req,res,next)=>{
    const token= req.headers.authorization?.split(" ")[1] || req.cookies.token; ;
    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }
    const isBlacklistedToken=await blackListTokenModel.findOne({token}); 
    if(isBlacklistedToken){
        return res.status(401).json({message:"Unauthorized"});
    }
    try{
      
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
        const user=await userModel.findById(decoded._id);
        if(!user){
            return res.status(401).json({message:"Unauthorized"});
        }
        req.user=user;
        next();
    }catch(error){
        return res.status(401).json({message:"Unauthorized"});
    }
}

