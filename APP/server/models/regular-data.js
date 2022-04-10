const mongoose=require("mongoose")
const {ObjectId} = require('mongodb'); 
const Schema = mongoose.Schema
const regularData = new Schema({
    _id:String,
    title:String,
    text:String,
})
module.exports = mongoose.model('regularData',regularData,'regularData');