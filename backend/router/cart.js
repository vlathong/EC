
var express = require('express');
var router = express.Router();
var cors = require('cors');
var dboperations=require('../query/cart')
router.use(cors())

router.use((request,response,next)=>{
    console.log('middleware');
    next();
  })
router.get('/:id', (req,res)=>{
  const {id} = req.params
  dboperations.getProducts(id).then(result=>{
    
    res.send(result);
  })
  
})
router.post('/',(req,res,next)=>{
    dboperations.addCart(req.body).then(result=>{
      
      res.send('post reached');
     
    })
  })
router.patch('/cart',(req,res,next)=>{
  dboperations.updateProduct1(req.body).then(result=>{
    
    res.send('post reached');
    
  })
})
router.delete('/delete', (req,res)=>{
  dboperations.deleteProduct(req.body).then(result=>{
    res.send(result);
  })
  
})
router.get('/cart/:id', (req,res)=>{
  const {id} = req.params
  dboperations.getCart(id).then(result=>{
   
    res.send(result);
  })
  
})
router.get('/cartHistory/:id', (req,res)=>{
  const {id} = req.params
  dboperations.getCartHistory(id).then(result=>{
   
    res.send(result);
  })
  
})
  module.exports = router;