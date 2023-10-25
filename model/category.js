const mongoose = require('mongoose')
const Schema = mongoose.Schema

const category  = new Schema ({
    name:{
        unique:true,
        required:true,
        type:String
    },
    img:String
})

const CATEGORY = mongoose.model('Category',category)

module.exports = CATEGORY