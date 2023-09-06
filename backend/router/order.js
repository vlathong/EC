
var express = require('express');
var router = express.Router();
var dboperations=require('../query/order')
router.use((request,response,next)=>{
    
    next();
  })
router.get('/order', (req,res)=>{
  dboperations.getOrders().then(result=>{
    res.send(result);
  })
  
})
router.get('/:id', (req,res)=>{
  const {id} = req.params
  dboperations.getUOrder(id).then(result=>{
   
    res.send(result);
  })
  
})
router.post('/order',(req,res,next)=>{
    dboperations.createOrders(req.body).then(result=>{
     
      res.send('post reached');
      
    })
  })
router.patch('/:id',(req,res,next)=>{
  dboperations.updateOrders(req.body).then(result=>{
  
    res.send('post reached');
  })
})
router.delete('/:id', (req,res)=>{
  const {id} = req.params
  dboperations.deleteOrders(id).then(result=>{
    
    res.send(result);
  })
})
router.get('/order/revenue',(req,res)=>{
  dboperations.getRevenue().then(result=>{
    res.send(result);
  })
  
})
router.get('/order/month',(req,res)=>{
  dboperations.getRevenueMonth().then(result=>{
    res.send(result);
  })
  
})
router.get('/order/year',(req,res)=>{
  dboperations.getRevenueYear().then(result=>{
    res.send(result);
  })
  
})
router.post('/order/orderDetails',(req,res)=>{
  dboperations.insertOrder_Details(req.body).then(result=>{
    console.log(result)
    res.status(200).send((result).toString());
  })
  
})
router.post('/order/orderItems',(req,res)=>{
  console.log(req.body)
  dboperations.insertOrderItem(req.body).then(result=>{
    res.send(result);
  })
  
})
  module.exports = router;