 const express=require('express')
 const router=express.Router()
const User=require('../models/users')
 const mongoose=require("mongoose")
 const jwt = require('jsonwebtoken')
const {OAuth2Client} =require('google-auth-library')
const {ObjectId} = require('mongodb'); 

const CLIENT_ID='748490838001-jhij0iprrvpd293fs4rt3pg37hijgj1t.apps.googleusercontent.com';
const googleClient =new OAuth2Client({clientId:CLIENT_ID});



const db="mongodb+srv://ram:123@cluster0.ckfs2.mongodb.net/abc?retryWrites=true&w=majority"

//mongoose.connect("mongodb://localhost:27017/yelp_camp",{useNewUrlParser:true});

mongoose.connect(db,{useNewUrlParser:true},err=>{
    if(err){
        console.log("error",err)
    }
    else{
        console.log('connected to server');
    }
})


router.get('/',(req,res)=>{
    res.send('From api route')
         })
router.post('/register',(req,res)=>{
    let userData=req.body
    let user=new User(userData);
    user.save((err,registeredUser)=>{
     if(err){
         console.log(err);
     }
     else
     {
       let payload  = {subject : registeredUser._id}
       let token = jwt.sign(payload,'secretKey')
         res.status(200).send({token})
     }
    })
})


router.post('/login',(req,res)=>{
    let userData=req.body;
    
    User.findOne({userName: userData.userName},(error,user)=>{
        console.log("finding one")
        if(error){
            console.log(error,"this is the error")
        }
        else{
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
                    res.status(200).send({token})
                }
            }
        }
    })
})
async function verifyGoogleLogin(token)
{
   const ticket =await googleClient.verifyIdToken({
        audience:CLIENT_ID,
        idToken:token
    });
    const payload =ticket.getPayLoad();
    if(payload)
    {
       return payload
    }
    return null
}verifyGoogleLogin().catch(console.error);



router.post('/social-login',(req,res)=>
{
     const {provider,response}=req.body
     const {id_token}=response
   //you got the google token now you can verify this in two steps
   //1) Send token to some google domain to verify =>may be slow cuz based on network
   //2) verifying by ourself lets do 2nd one

   User.findOne({_id: req.body.id},(error,user)=>{
    if(error){
        console.log(error,"this is the error")
        }
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
           const payload=verifyGoogleLogin(id_token);
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
    } } );//find one 
}
);

function verifyToken(req,res,next)
{
  
    if(!req.headers.authorization)
    {
        return res.status(401).send('Unauthorized request req lo authorization header ledhu')
    }
  
    let token =req.headers.authorization.split(' ')[1];
    if(token === 'null'){
        return res.status(401).send('Unauthorized request token null vundhi')
    }
   
    let payload;
     jwt.verify(token,'secretKey',(error,decoded)=>
    {
        if(error)
        {
            console.log("this is the error comes always",error)
        }
         payload =decoded

    })
    let googlepayload=verifyGoogleLogin(token)

    console.log("normal payload",payload)
    console.log("google payload",googlepayload)
    if(!payload && !googlepayload){
        return res.status(401).send('Unauthorized request')
    }  
    else
    {
        if(!payload)
        {
              req.userId=googlepayload.subject
              next()
        }
        else
        {
            req.userId = payload.subject
            next()
        }
    } 
   
}















router.get('/events',(req,res)=>{
    let events=[
        {
            "userName":"he",
            "password":"123",
            "confirm":"123"
        },
        {
            "userName":"he",
            "password":"123",
            "confirm":"123"
        },
        {
            "userName":"he",
            "password":"123",
            "confirm":"123"
        },
        {
            "userName":"he",
            "password":"123",
            "confirm":"123"
        },
        {
            "userName":"he",
            "password":"123",
            "confirm":"123"
        },
        {
            "userName":"he",
            "password":"123",
            "confirm":"123"
        },
        {
            "userName":"he",
            "password":"123",
            "confirm":"123"
        },
        {
            "userName":"he",
            "password":"123",
            "confirm":"123"
        },{
            "userName":"he",
            "password":"123",
            "confirm":"123"
        },
        {
            "userName":"he",
            "password":"123",
            "confirm":"123"
        }

    ]
    res.json(events)
});

router.get('/special',verifyToken,(req,res,err)=>{
    if(err)
    {
        console.error(err);
    }
    let events=[
        {
            "userName":"ram",
            "password":"123",
            "confirm":"123"
        },
        {
            "userName":"ram",
            "password":"123",
            "confirm":"123"
        },
        {
            "userName":"ram",
            "password":"123",
            "confirm":"123"
        },
        {
            "userName":"ram",
            "password":"123",
            "confirm":"123"
        },
        {
            "userName":"he",
            "password":"123",
            "confirm":"123"
        },
        {
            "userName":"he",
            "password":"123",
            "confirm":"123"
        },
        {
            "userName":"he",
            "password":"123",
            "confirm":"123"
        },
        {
            "userName":"he",
            "password":"123",
            "confirm":"123"
        },{
            "userName":"he",
            "password":"123",
            "confirm":"123"
        },
        {
            "userName":"he",
            "password":"123",
            "confirm":"123"
        }
    ]
    res.json(events)
});


module.exports=router;

