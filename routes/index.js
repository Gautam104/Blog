var express = require('express');
var router = express.Router();
const ADMIN = require('../model/admin')
const USER = require('../model/user')
const CATEGORY = require('../model/category')
const bcrypt = require('bcryptjs')
const usercontroller = require('../controller/user')
const admincontoller = require('../controller/admin')
const categorycontroller = require('../controller/category')
const BLOG = require('../model/blog')
const blogcontroller = require('../controller/blog')
const multer = require('multer')



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
  }
})

const upload = multer({ storage: storage })

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// USER DATA 

router.post('/user_singup',usercontroller.usersignup)

router.post('/user_login',usercontroller.userlogin)

router.delete('/user/:id',admincontoller.Asecure,usercontroller.userdelete)

// ADMIN DATA 

router.post('/admin_signup',admincontoller.adminsingup)

router.post('/admin_login',admincontoller.adminlogin)

// category data

router.post('/create_category',upload.single('img'),admincontoller.Asecure,categorycontroller.create_category)

router.put('/update_category/:id', upload.single('img'),admincontoller.Asecure,categorycontroller.update_category)

router.delete('/delete_category/:id',upload.single('img'),admincontoller.Asecure,categorycontroller.delete_category)

router.get('/get_category',upload.single('img'),categorycontroller.get_category)


// BLOG DATA  

router.post('/create_blog',upload.single('img'),admincontoller.Asecure,blogcontroller.create_blog)

router.put('/update_blog/:id',upload.single('img'),admincontoller.Asecure,blogcontroller.update_blog)

router.delete('/delete_blog/:id',upload.single('img'),admincontoller.Asecure,blogcontroller.delete_blog)

router.get('/get_blog',upload.single('img'),blogcontroller.get_blog)

// BLOG DATA

router.post('/create_blog',upload.single('img'),usercontroller.secure,blogcontroller.create_blog)

router.put('/update_blog/:id',upload.single('img'),usercontroller.secure,blogcontroller.update_blog)

router.delete('/delete_blog/:id',upload.single('img'),usercontroller.secure,blogcontroller.delete_blog)


module.exports = router;
