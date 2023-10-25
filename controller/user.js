const USER = require('../model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


exports.secure = async (req,res,next) => {

    try { 
    let token = req.headers.authorization

    if(!token)
    {
        throw new Error("plase attched token")
    }

    const checktoken = await jwt.verify(token,"USER")

    const checkuesr = await USER.findById(checktoken.id)

    if(!checkuesr)
    {
        throw new Error("user not found")
    }

    next()

    } catch (error) {
        res.status(404).json({
            message:error.message
        })
    }
}

exports.usersignup = async (req,res) => {
    try {
       
      if(!req.body.name || !req.body.email || !req.body.password)
      {
        throw new Error("plase enter valid fileds")
      }
  
        req.body.password = await bcrypt.hash(req.body.password,8)
  
        
        const data= await USER.create(req.body)
        var token = jwt.sign({id:data._id},"USER")
  
        res.status(201).json({
          message:"user created",
          data:data,
          token
        })
  
    } catch (error) {
      res.status(404).json({
        message:error.message
      })
    }
  }


exports.userlogin = async (req,res) => {
 
    try {
  
    if(!req.body.email || !req.body.password)
    {
      throw new Error("plase enter valid fileds")
    }
  
       const data1 = await USER.findOne({email:req.body.email})
  
       if(!data1)
       {
        throw new Error("plase enter valid email")
       }
  
       const checkpass = await bcrypt.compare(req.body.password,data1.password)
  
       if(!checkpass)
       {
        throw new Error("plase enter valid password")
       }

       var token = await jwt.sign({id:data1._id},"USER")
  
       res.status(201).json({
        message:"user login sucessfully",
        data:data1,
        token
       })
    } catch (error) {
      res.status(404).json({
        message:error.message
      })
    }
  }

  exports.userdelete = async (req,res) => {
    try {
    const data = await USER.findByIdAndDelete(req.params.id)

    res.status(201).json({
       message:"user deleted",
       data:data
    })   
    } catch (error) {
     res.status(404).json({
        message:error.message
     })   
    }
}


