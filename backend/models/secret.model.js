const mongoose=require("mongoose")

const Schema=mongoose.Schema

const secretSchema=new Schema({
    firstName:{type:String,required:true,trim:true},
    lastName:{type:String,required:true,trim:true},
    email:{type:String,required:true,trim:true},
    password:{type:String,required:true},
    confirmPassword:{type:String,required:true},  
    securityQuestion:{type:String,required:true},
    securityAnswer:{type:String,required:true},
    securityQuestion1:{type:String,required:true},
    securityAnswer1:{type:String,required:true}
})

const Secret=mongoose.model("Secret",secretSchema)

module.exports=Secret