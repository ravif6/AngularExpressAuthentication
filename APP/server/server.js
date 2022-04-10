const express = require('express')
const bodyParser =require('body-parser')
const cors =require('cors')
const api=require('./routes/api')
const events = require('./routes/events')

const PORT=5000

const app=express()
app.use(cors())
app.use(bodyParser.json())
app.use('/api',api)
app.use('/events',events);

app.get('/',function(req,res){
res.send("hello im server")
});

app.listen(PORT,function(){
    console.log("server is running"+PORT);
})