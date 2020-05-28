const router=require("express").Router()
let Register=require("../models/Register.model")


router.route("/register").post((req,res)=>{
    const email=req.body.email
    const course=req.body.course
    const duration=req.body.duration
    const date=req.body.date

    const newRegister=new Register({email,course,duration,date})

    newRegister.save()
       .then(()=>res.json("Register added"))
       .catch(err=>res.status(400).json("Erros:"+err))
})

router.route("/:mail").get((req,res)=>{
    Register.find({ email: req.params.mail }, function(err, user) {
    })  .then(user=>
      
        res.json(user)
   )
       .catch(err=>res.status(400).json("Erros:"+err))
})


router.route("/edits/:id").get((req,res)=>{
    Register.findById(req.params.id)
       .then(register=>res.json(register))
       .catch(err=>res.status(400).json("Error: "+err))
})

router.route("/:id").delete((req,res)=>{
    Register.findByIdAndDelete(req.params.id)
       .then(()=>res.json("Register deleted"))
       .catch(err=>res.status(400).json("Error: "+err))
})

router.route("/update/:id").post((req,res)=>{
    Register.findById(req.params.id)
       .then(register=>{
        register.course=req.body.course
        register.duration=Number(req.body.duration)
        register.date=Date.parse(req.body.date)

        register.save()
              .then(()=>res.json("register Updated"))
              .catch(err=>res.status(400).json("Error: "+err))
       })
       .catch(err=>res.status(400).json("Error: "+err))
})

module.exports=router