const express = require('express');
const bodyParser=require('body-parser');
const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all((req,res,next)=>{
    console.log("getting here");
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res,next)=>{
    res.end('will send all dishes to you');
})
.post((req,res,next)=>{
    res.end('will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req,res,next)=>{
    res.statusCode=403;
    res.end('put operation not supported on dishes');
})
.delete((req,res,next)=>{
    res.end('Deleting all dishes');
});

dishRouter.route('/:dishId')
.get((req,res,next)=>{
    res.end('will send the details of the dish with id: ' + req.params.dishId + ' to you');
})
.post((req,res,next)=>{
    res.statusCode=403;
    res.end('POST operation not supported on /dishes/ with dish id: ' + req.params.dishId );
})
.put((req,res,next)=>{
    res.write('updating details of dish with id: ' + req.params.dishId + '\n');
    res.end('Will update the dish: ' + req.body.name + ' with details: ' + req.body.description);
})
.delete((req,res,next)=>{
    res.end('Deleting dish with id: ' + req.params.dishId);
});

module.exports = dishRouter;