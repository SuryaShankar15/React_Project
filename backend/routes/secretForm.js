const router=require("express").Router()
let Secret=require("../models/secret.model")
const bcrypt = require('bcrypt');


router.route("/signupadd").post((req,res)=>{
  Secret.findOne({ email: req.body.email }, function(err, user) {
  }).then(user=>{
   if (user!=null){
   res.json("")
   }
   else{
    res.json("user not exits")
   }

  })
})

router.route("/add").post((req,res)=>{
  const securityQuestion=req.body.securityQuestion
  const securityAnswer=req.body.securityAnswer
  const securityQuestion1=req.body.securityQuestion1
  const securityAnswer1=req.body.securityAnswer1
  const firstName=req.body.firstName
  const lastName=req.body.lastName
  const email=req.body.email
  const password=req.body.password
  const confirmPassword=req.body.confirmPassword
  

  const newSignupform=new Secret({firstName,lastName,email,password,confirmPassword,securityQuestion,securityAnswer,securityQuestion1,securityAnswer1})



  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newSignupform.password, salt, (err, hash) => {
     newSignupform.password = hash;
     bcrypt.hash(newSignupform.confirmPassword, salt, (err, hash) => {
       newSignupform.confirmPassword = hash;
     newSignupform.save()
        .then(()=>res.json("User Added"))
        .catch(err => console.log(err));
    });
 })
  });
   
})


router.route("/:props").get((req,res)=>{
  Secret.findOne({ email: req.params.props }, function(err, user) {
  })
     .then(login=>res.json(login))
     .catch(err=>res.status(400).json("Erros:"+err))
})



router.route("/login").post((req,res)=>{

  Secret.findOne({ email: req.body.email }, function(err, user) {
  }).then(user=>{
   if (user==null){
   res.json("notExits")
   
   }
   else{
    const email = req.body.email;
    const password = req.body.password;
  
    bcrypt.compare(password, user.password).then(isMatch => {
       if (isMatch) {
       res.json("matched")
       }
    else{
       res.json("not matched")
    }})
   }
 })
 })
 




router.route("/:id/fp").get((req,res)=>{
  Secret.findById(req.params.id)
     .then(secret=>res.json(secret))
     .catch(err=>res.status(400).json("Error: "+err))
})



router.route("/update/:id").post((req,res)=>{
  Secret.findById(req.params.id)
     .then(user=>{
      user.firstName=req.body.firstName
      user.lastName=req.body.lastName
      user.email=req.body.email
      user.password=req.body.password
      user.confirmPassword=req.body.confirmPassword
      user.securityQuestion=req.body.securityQuestion
      user.securityQuestion1=req.body.securityQuestion1
      user.securityAnswer=req.body.securityAnswer
      user.securityAnswer1=req.body.securityAnswer1

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
         user.password = hash;
         bcrypt.hash(user.confirmPassword, salt, (err, hash) => {
           user.confirmPassword = hash;
              user.save()
            .then(()=>res.json("User Updated"))
            .catch(err => console.log(err));
        });
     })
      });
     })
     .catch(err=>res.status(400).json("Error: "+err))
})




module.exports=router