const mongoose=require("mongoose")
const {ObjectId} = require('mongodb'); 
const Schema = mongoose.Schema
const userSchema = new Schema({
    _id:String,
    userName:String,
    password:String,
    confirm:String
})
module.exports = mongoose.model('user',userSchema,'users')