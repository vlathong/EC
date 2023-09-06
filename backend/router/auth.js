
var express = require('express');
var router = express.Router();
var dboperations=require('../query/auth')

const cookieParser = require("cookie-parser");
const sessions = require('express-session');
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(cookieParser());
const oneDay = 1000 * 60 * 60 * 24;

router.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));
router.use((request,response,next)=>{
    console.log('middleware');
    next();
  })
router.post('/login',(req,res,next)=>{
    dboperations.login(req).then(result=>{
      console.result
      if(result[0]=="success")
      {
        session=req.session;
        session.id=result[1];
        res.status(200).json({success:true,message:"login success",session:result[1]})
      }
      else if(result=="fail")
      {
        res.status(200).json({success:false,message:"Username or password incorrect"})
      }
      else
      {
        res.status(500).json({success:false,message:"Internal server error"})
      }
    })
  })

  router.post('/register',(req,res,next)=>{
    dboperations.register(req).then(result=>{
      console.log(result)
      if(result=="Successful")
      {
        res.status(200).json({success:true,message:"login success"})
      }
      else if(result=="fail")
      {
        res.status(200).json({success:false,message:"Username or tel exist"})
      }
      else
      {
        res.status(500).json({success:false,message:"Internal server error"})
      }
    })
  })
  

  module.exports = router;