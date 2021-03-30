//imports
const express = require('express');
const http = require('http');
const morgan = require('morgan');
//const bodyParser = require('body-parser');
//import route modules
const dishRouter = require('./routes/dishRouter');
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');
//set hostname and port for use with createServer
const hostname = 'localhost';
const port = 3000;
//const fs = require('fs');
//const path = require('path');

/* use express */
const app=express();
//console request logger 
app.use(morgan('dev'));
//parse body of request if in json format
app.use(express.json());
//route request based on the URI
app.use('/dishes',dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);
//serve static files
app.use(express.static(__dirname+ '/public'));
//serve this when requested route is not matched with routes outlined above
app.use((req,res,next)=>{
    console.log(req.headers);
    res.statusCode = 200;
                    res.setHeader('Content-Type','text-html');
                    res.end('<html> <body> <h1> This is an express server</h1> </body> </html>');
});

/* 
//use vanilla http server built in node 
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

// use express js - juse createServer with app from express 
const server = http.createServer(app);

server.listen(port, hostname, ()=> {
    console.log(`server is running at http://${hostname}:${port}`);
});