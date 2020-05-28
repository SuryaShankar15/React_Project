const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")

require("dotenv").config()

const app=express()
const port=process.env.PORT|| 5000

app.use(cors())
app.use(express.json())

const uri=process.env.ATLAS_URI
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true}).catch(error=>console.error(error))

const connection=mongoose.connection
connection.once("open",()=>{
    console.log("MongoDB database connection established successfully")
}).then(res=>{res})



const secretRouter=require("./routes/secretForm")
const registerRouter=require("./routes/registerForm")


app.use("/secret",secretRouter)
app.use("/Yoga_register",registerRouter)


app.listen(port,()=>{
    console.log(`server is running in port: ${port}`)
})