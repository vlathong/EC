
var express = require('express');
var router = express.Router();
var dboperations=require('../query/point')
router.get('/point',(req,res,next)=>{
    dboperations.getPoints().then(result=>{
        res.send(result);
    })
  })
router.get('/pointVolatilityDay',(req,res,next)=>{
    dboperations.getpointVolatilityDay().then(result=>{
        res.send(result);
    })
  })
  router.get('/pointVolatilityMonth',(req,res,next)=>{
    dboperations.getpointVolatilityMonth().then(result=>{
        res.send(result);
    })
  })
  router.get('/pointVolatilityYear',(req,res,next)=>{
    dboperations.getpointVolatilityYear().then(result=>{
        res.send(result);
    })
  })
  router.get('/getRemainPointsDay/:id',(req,res,next)=>{
    dboperations.getRemainPointsDay(req).then(result=>{
        res.send(result);
    })
  })
  router.get('/getRemainPointsMonth/:id',(req,res,next)=>{
    dboperations.getRemainPointsMonth(req).then(result=>{
        res.send(result);
    })
  })
  router.get('/getRemainPointsYear/:id',(req,res,next)=>{
    dboperations.getRemainPointsYear(req).then(result=>{
        res.send(result);
    })
  })
  router.post('/insertPoint',(req,res,next)=>{
    dboperations.insertPoint(req).then(result=>{
        res.send(result);
    })
  })

  module.exports = router;