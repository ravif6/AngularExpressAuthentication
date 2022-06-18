const User=require('../models/users')
const jwt = require('jsonwebtoken')
const {OAuth2Client} =require('google-auth-library')

const CLIENT_ID='748490838001-jhij0iprrvpd293fs4rt3pg37hijgj1t.apps.googleusercontent.com';
const googleClient =new OAuth2Client({clientId:CLIENT_ID});

async function verifyGoogleLogin(token)
{
   const ticket =await googleClient.verifyIdToken({
        audience:CLIENT_ID,
        idToken:token
    });
    const payload =ticket.payload
    if(payload)
    {
       return payload
    }
    return null
}//verifyGoogleLogin().catch(console.error);  //Use debug Module for logging errors know about it and use 

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

async function getUser(obj)
{
    let foundUser;
     await User.findOne(obj,(error,user)=>{
        console.log("finding one... with user name",obj);
        if(error){
            console.log(error,"this is the error while find user")
            foundUser=null;  //Use debug Module for logging errors know about it and use 
        }
        else{
            console.log("current user",user);
            foundUser=user;
        }
       
    });
    console.log("found User",foundUser);
    return foundUser;
}

module.exports={verifyGoogleLogin,verifyToken,getUser};