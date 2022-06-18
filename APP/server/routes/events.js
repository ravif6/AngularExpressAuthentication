const functions =require('./functions.js');
const express=require('express')
const router=express.Router()
const RegularData=require('../models/regular-data')

router.get('/regular',async (req,res)=>{

    // let regularDataObject=
    // {
    //     _id:new ObjectId(),
    //     title:"Test",
    //     text:"This is a long test",
    // }
   // let regularData = new RegularData(regularDataObject);
    
    // regularData.save((err,data)=>{
    //     if(err){
    //         console.log(err);
    //         res.status(500).send({error});
    //          }
    //  else
    //         {
    //           console.log("data saved into db")
    //        res.status(200).send({data});
    //         }
  //  });
  let regularData = [];
  regularData = await RegularData.find({},function(err, data) {
        if(err){
            console.log(error);
        }
        return data;
    });
  res.send(regularData); 
});
router.get('/special',functions.verifyToken,(req,res,err)=>{
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