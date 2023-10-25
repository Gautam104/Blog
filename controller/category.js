const CATEGORY = require('../model/category')
const jwt = require('jsonwebtoken')



exports.create_category = async (req,res) => {
  
    try {

     req.body.img=req.file.filename  
 
     if(!req.body.name || !req.body.img)
     {
       throw new Error("plase enter valid fileds")
     }
     
     const data = await CATEGORY.create(req.body)
 
     res.status(201).json({
       message:"category created",
       data:data
     })
    } catch (error) {
     res.status(404).json({
       message:error.message
     })
    }
 }

 exports.update_category = async (req,res) => {

    try {
      
    const data = await CATEGORY.findByIdAndUpdate(req.params.id,req.body)
  
    res.status(200).json({
      message:"category updated",
      data:data
    })
    } catch (error) {
      res.status(404).json({
        message:error.message
      })
    }
  }

exports.delete_category = async (req,res) => {

    await CATEGORY.findByIdAndDelete(req.params.id)

     res.status(204).json({
       message:"category deleted"
     })

    
     res.status(404).json({
      message:error.message
     })
}

exports.get_category = async (req,res) => {

   try {
    const data = await CATEGORY.find()

    res.status(201).json({
     message:"all category",
     data:data
    })

   } catch (error) {
    res.status(404).json({
        message:error.message
       })
   }  
}
