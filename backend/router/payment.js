var express = require('express');
var router = express.Router();
var dboperations=require('../query/payment')
router.use((request,response,next)=>{
    next();
  })
router.get('/address/:id', (req,res)=>{
    const{id}=req.params
  dboperations.getAddress(id).then(result=>{
    res.send(result);
  })
  
})
router.get('/point/:id', (req,res)=>{
  const{id}=req.params
dboperations.getPointLimit(id).then(result=>{
  res.send(result);
})
})
router.post('/address', (req,res)=>{
dboperations.getPointLimit(req).then(result=>{
  res.send(result);
})
})
router.get('/config', (req,res)=>{
  return res.status(200).json({
    status:'OK',
    data:'AeaIl7bGkbEw99niuDoeFkKOB5n8MPpYU7eka_lMjvVaJCpSZGpU-A_g2BdBRlgTijW7b3jUWcosiFMn'
  })
})


  module.exports = router;