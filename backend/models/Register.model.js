const mongoose=require("mongoose")

const Schema=mongoose.Schema

const registerSchema=new Schema({
    email:{type:String,required:true},
    course:{type:String,required:true},
    duration:{type:Number,required:true,trim:true},
    date:{type:Date,required:true},
   
})

const Register=mongoose.model("Register",registerSchema)

module.exports=Register