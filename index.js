const express = require('express');
const http =  require('http');
const morgan = require('morgan');
const bodyParser=require('body-parser');

const hostname = 'localhost';
const port = 3000;
const fs = require('fs');
const path = require('path');

/* use express */
const app=express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(__dirname+ '/public'));

app.all('/dishes', (req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
});

app.get('/dishes',(req,res,next)=>{
    res.end('will send all dishes to you');
});

app.post('/dishes',(req,res,next)=>{
    res.end('will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
});

app.put('/dishes',(req,res,next)=>{
    res.statusCode=403;
    res.end('put operation not supported on dishes');
});

app.delete('/dishes',(req,res,next)=>{
    res.end('Deleting all dishes');
});

app.get('/dishes/:dishId',(req,res,next)=>{
    res.end('will send the details of the dish with id: ' + req.params.dishId + ' to you');
});

app.post('/dishes/:dishId',(req,res,next)=>{
    res.statusCode=403;
    res.end('POST operation not supported on /dishes/ with dish id: ' + req.params.dishId );
});

app.put('/dishes/:dishId',(req,res,next)=>{
    res.write('updating details of dish with id: ' + req.params.dishId + '\n');
    res.end('Will update the dish: ' + req.body.name + ' with details: ' + req.body.description);
});

app.delete('/dishes/:dishId',(req,res,next)=>{
    res.end('Deleting dish with id: ' + req.params.dishId);
});

app.use((req,res,next)=>{
    console.log(req.headers);
    res.statusCode = 200;
                    res.setHeader('Content-Type','text-html');
                    res.end('<html> <body> <h1> This is an express server</h1> </body> </html>');
});


/* 
//use plain http server builtin to node 
const server = http.createServer((req,res)=>{
    console.log("Request for " + req.url + " by method " + req.method);
    console.log(req.headers);
    if (req.method == 'GET'){
        let fileUrl;
        if (req.url == '/') fileUrl='./index.html';
        else fileUrl=req.url;
        let filePath = path.resolve('./public'+fileUrl);
        const fileExt= path.extname(filePath);
        if (fileExt == '.html'){
            fs.stat(filePath, (exists)=>{
                if (!exists) {
                    res.statusCode = 404;
                    res.setHeader('Content-Type','text-html');
                    res.end('<html> <body> <h1> File not found - Error 404 </h1> </body> </html>');
                }
                else{
                    res.statusCode = 200;
                    res.setHeader('Content-Type','text-html');
                    fs.createReadStream(filePath).pipe(res);
                }
            });
        }
        else{
            res.statusCode = 404;
            res.setHeader('Content-Type','text-html');
            res.end('<html> <body> <h1> File not an HTML file - Error 404 </h1> </body> </html>');
        }
    }
    res.statusCode = 400;
    res.setHeader('Content-Type','text-html');
    res.end('<html> <body> <h1> BAD Request - method not supported - Error 40 </h1> </body> </html>');
});
*/

// use express js 
const server = http.createServer(app);

server.listen(port, hostname, ()=> {
    console.log(`server is running at http://${hostname}:${port}`);
});