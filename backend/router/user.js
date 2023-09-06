var express = require('express');
var router = express.Router();
var dboperations=require('../query/user')
router.use((request,response,next)=>{
  
    next();
  })
router.get('/user', (req,res)=>{
  dboperations.getUsers().then(result=>{
    
    res.send(result);
  })
  
})
router.get('/:id', (req,res)=>{
  const {id} = req.params
  dboperations.getUser(id).then(result=>{
  
    res.send(result);
  })
  
})
router.post('/',(req,res,next)=>{
    dboperations.createUser(req.body).then(result=>{
     
      res.send('post reached');
      
    })
  })
router.patch('/:id',(req,res,next)=>{
  dboperations.updateUser(req.body).then(result=>{
   
    res.send('patch reached');
    
  })
})
router.delete('/:id', (req,res)=>{
  const {id} = req.params
  dboperations.deleteUser(id).then(result=>{
    
    res.send(result);
  })
  
})
  module.exports = router;