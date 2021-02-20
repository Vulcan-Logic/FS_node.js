const http =  require('http');
const hostname = 'localhost';
const port = 3000;
const fs = require('fs');
const path = require('path');

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
    res.statusCode = 404;
    res.setHeader('Content-Type','text-html');
    res.end('<html> <body> <h1> Request method not supported - Error 404 </h1> </body> </html>');
});

server.listen(port, hostname, ()=> {
    console.log(`server is running at http://${hostname}:${port}`);
});
