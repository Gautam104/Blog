const ADMIN = require('../model/admin')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



exports.Asecure = async (req,res,next) => {
  
    try {
        console.log(req.headers);
        let token = req.headers.authorization

        if(!token)
        {
            throw new Error("plase attched token")
        }

        const checktoken = jwt.verify(token,"ADMIN")

        const checkuser = await ADMIN.findById(checktoken.id)

        if(!checkuser)
        {
            throw new Error("ADMIN not found")
        }

        next()

    } catch (error) {
     res.status(404).json({
        message:error.message
     })   
    }   
}

exports.adminsingup = async (req,res) => {
    try {  
      if(!req.body.name || !req.body.email || !req.body.password)
      {
        throw new Error("plase enter valid fileds")
      }
  
       req.body.password = await bcrypt.hash(req.body.password,8)
  
       const data = await ADMIN.create(req.body)

       var token = jwt.sign({id:data._id},"ADMIN")
   
       res.status(201).json({
        message:"admin created",
        data:data,
        token
       })
    } catch (error) {
      res.status(404).json({
        message:error.message
      })
    }
  }

exports.adminlogin =  async (req,res) => {
    try {
      
      if(!req.body.email || !req.body.password)
      {
        throw new Error("plase enter valid fileds")
      }

    const data1 = await ADMIN.findOne({email:req.body.email})

    if(!data1)
    {
      throw new Error("plase enter valid email")
    }

    const checkpass = await bcrypt.compare(req.body.password,data1.password)

    if(!checkpass)
    {
      throw new Error("plase enter valid password")
    }

    var token = jwt.sign({id:data1._id},"ADMIN")


    res.status(201).json({
      message:"admin login successfully",
      data:data1,
      token
    })
    } catch (error) {
      res.status(404).json({
        message:error.message
      })
    }
}