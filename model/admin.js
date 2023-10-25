const mongoose = require('mongoose')
const Schema = mongoose.Schema

const admin = new Schema({
    name:String,
    email:{
        type:String,
        unique:true
    },
    password:String
})

const ADMIN = mongoose.model('admin',admin)

module.exports = ADMIN