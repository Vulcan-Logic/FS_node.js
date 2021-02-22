const express = require('express');
const bodyParser=require('body-parser');
const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all((req,res,next)=>{
    console.log("getting here");
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res,next)=>{
    res.end('will send all promotions to you');
})
.post((req,res,next)=>{
    res.end('will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req,res,next)=>{
    res.statusCode=403;
    res.end('put operation not supported on promotions');
})
.delete((req,res,next)=>{
    res.end('Deleting all promotions');
});

promoRouter.route('/:promoId')
.get((req,res,next)=>{
    res.end('will send the details of the promotion with id: ' + req.params.promoId + ' to you');
})
.post((req,res,next)=>{
    res.statusCode=403;
    res.end('POST operation not supported on /promotions/ with promo id: ' + req.params.promoId );
})
.put((req,res,next)=>{
    res.write('updating details of promo with id: ' + req.params.promoId + '\n');
    res.end('Will update the promotion: ' + req.body.name + ' with details: ' + req.body.description);
})
.delete((req,res,next)=>{
    res.end('Deleting promotion with id: ' + req.params.promoId);
});

module.exports = promoRouter;