const functions =require('./functions.js');
 const express=require('express')
 const router=express.Router()
const User=require('../models/users')
const RegularData=require('../models/regular-data')
 const mongoose=require("mongoose")
 const jwt = require('jsonwebtoken')
const {ObjectId} = require('mongodb'); 

const db="mongodb+srv://ram:123@cluster0.ckfs2.mongodb.net/abc?retryWrites=true&w=majority"


mongoose.connect(db,{useNewUrlParser:true},err=>{
    if(err){
        console.log("error in connecting to server: " + err.message,err)  //Use debug Module for logging errors
    }
    else{
        console.log('connected to server');
    }
})

router.get('/',(req,res)=>{
    res.send('From api route')
         })

router.post('/register',async (req,res)=>{
    let userData=req.body
    let user= await functions.getUser({userName:userData.userName});
    if(user){
        console.log("user already exists",user)
        res.status(200).send("user with the above userName already exists.")
    }
    let newuser=new User(userData);
    newUser._id=ObjectId();
    newUser.save((err,registeredUser)=>{
     if(err){
         console.log(err);
     }
     else
     {
       let payload  = {subject : registeredUser._id}
       let token = jwt.sign(payload,'secretKey')
         res.status(200).send({"id_token":token,"userData":user})
         console.log("User registered Successfully");
     }
    })
})


router.post('/login',async (req,res)=>{

    console.log('login called')
    let userData=req.body;
    let user= await functions.getUser({userName:userData.userName});
    
        if(!user)
        {
            res.status(401).send("Invalid userName")
        }
        else
        {
            if(user.password !== userData.password)
            {
                res.status(401).send("Invalid Password")
            }
            else
            {
                let payload  = {subject : user._id}
                let token = jwt.sign(payload,'secretKey')
                res.status(200).send({"id_token":token,"userData":user})
            }
        }
    

   
})


router.post('/social-login',async (req,res)=>
{
     const {provider,response}=req.body
     const {id_token}=response
   //you got the google token now you can verify this in two steps
   //1) Send token to some google domain to verify =>may be slow cuz based on network
   //2) verifying by ourself lets do 2nd one

   let user= await functions.getUser({_id: req.body.id});
        if(user)
        {
                   console.log("user already exists",user)
                   res.status(200).send({"id_token":id_token,"userData":user})
        }
        else 
       {
              console.log("User doesn't exists so creating one")
          if(provider=='GOOGLE')
           {
           const payload=functions.verifyGoogleLogin(id_token);
           if(!payload)
           {
             console.error("something wrong with the i_token so failed Login with google")
           }
         else 
          {
             console.log("login with google done now saving him to db");
        
            let userObject={"_id":req.body.id,
            "userName":req.body.email,
            "password":"",
             "confirm":""}
            
            let user=new User(userObject);
            user.save((err,registeredUser)=>{
            if(err){
                  console.log(err);
                   }
           else
                  {
                    console.log("user saved into db")
                 res.status(200).send({"id_token":id_token,"userData":registeredUser})
                  }
             })    //usersaved
         }//else 
        }//if
    } //find one 
}
);

module.exports=router;

