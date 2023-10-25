const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blog = new Schema ({
    title:{
        type:String,
        unique:true
    },
    desc:String,
    img:String,
    category:{ type: Schema.Types.ObjectId, ref:'Category',required:true},
    user:{ type: Schema.Types.ObjectId, ref:'user',required:true}
})

const BLOG = mongoose.model('blog',blog)

module.exports = BLOG