const mongoose=require('mongoose')
const Schema = mongoose.Schema

const userpost = new Schema({
    name:String,
    email:{
        type:String,
        unique:true
    },
    password:String
})

const USER = mongoose.model('user',userpost)

module.exports = USER