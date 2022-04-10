const express = require('express')
const bodyParser =require('body-parser')
const cors =require('cors')

const PORT=5000

const app=express()
app.use(cors())
const api=require('./routes/api')
app.use(bodyParser.json())
app.use('/api',api)


const path = require('path')

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../frontend/build')))

// AFTER defining routes: Anything that doesn't match what's above, send back index.html; (the beginning slash ('/') in the string is important!)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../frontend/build/index.html'))
})



app.get('/',function(req,res){
res.send("hello im server")
});

app.listen(PORT,function(){
    console.log("server is running"+PORT);
})