
var express = require('express');
var router = express.Router();
var dboperations=require('../query/category')

router.use((request,response,next)=>{
   
    next();
  })
router.get('/category',(req,res)=>{
    dboperations.getListCategory(req).then(result=>{
     
      res.send(result)
    })
  })
  module.exports = router;