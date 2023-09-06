
var express = require('express');
var router = express.Router();
var cors = require('cors');
var dboperations=require('../query/product')

router.use(cors())

router.use((request,response,next)=>{
    next();
  })
router.get('/product', (req,res)=>{
  dboperations.getProducts().then(result=>{
    res.send(result);
  })
  
})
router.get('/product/brand', (req,res)=>{
    dboperations.getBrands().then(result=>{
     
      res.send(result);
    })
    
  })
router.get('/:id', (req,res)=>{
  const {id} = req.params
  dboperations.getProduct(id).then(result=>{
    res.send(result);
  })
  
})
router.get('/customer/:id', (req,res)=>{
  const {id} = req.params
  dboperations.getProductCus(id).then(result=>{
    res.send(result);
  })
  
})
router.post('/',(req,res,next)=>{
    dboperations.createProduct(req.body).then(result=>{
      
      res.send('post reached');
     
    })
  })
router.patch('/:id',(req,res,next)=>{
  dboperations.updateProduct(req.body).then(result=>{
   console.log(req.body)
    res.send('patch reached');
  })
})
router.delete('/:id', (req,res)=>{
  const {id} = req.params
  dboperations.deleteProduct(id).then(result=>{
    
    res.send(result);
  })
  
})
router.get('/search/:name', (req,res)=>{
  const {name} = req.params
  dboperations.searchProduct(name).then(result=>{
    res.send(result);
  })
  
})
  module.exports = router;