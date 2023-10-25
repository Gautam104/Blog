const BLOG = require('../model/blog')

exports.create_blog =  async (req,res) => {
 
    try {

      req.body.img=req.file.filename

      if(!req.body.title || !req.body.desc || !req.body.img  || !req.body.category || !req.body.user)
      {
        throw new Error("plase enter valid fileds")
      }
  
        const data = await BLOG.create(req.body)
   
        res.status(201).json({
          message:"blog created",
          data:data
        })
    } catch (error) {
      res.status(404).json({
        message:error.message
      })
    }
  }

exports.update_blog = async (req,res) => {
 
    try {
      
     await BLOG.findByIdAndUpdate(req.params.id,req.body)
      
     res.status(200).json({
      message:"blog updated"
     })
  
    } catch (error) {
      res.status(404).json({
        message:error.message
      })
    }     
  }

exports.delete_blog = async (req,res) => {

    try {
      
     await BLOG.findByIdAndDelete(req.params.id)
      
      res.status(204).json({
        message:"blog deleted"
      })
    } catch (error) {
      res.status(404).json({
        message:error.message
      })
    }
  }

exports.get_blog = async (req,res) => {

    try {
  
      const data1 = await BLOG.find().populate(['category','user'])
  
      res.status(201).json({
        mmessage:"all recored here",
        data:data1
      })
    } catch (error) {
      res.status(404).json({
        message:error.message
      }) 
    }
  }  