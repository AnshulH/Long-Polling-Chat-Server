var http = require('http');
var url = require('url');
let static = require('node-static');
let fileServer = new static.Server('.');

var http = require('http');

function sendToAll() {

}

http.createServer(function (req, res) {
    console.log('Server running on port 8080');
    let parsedInfo = url.parse(req.url, true);
    if(parsedInfo.pathname == '/request' && parsedInfo.method == 'POST'){
        req.setEncoding('utf8');
        let message = '';
        req.on('data', (chunk) => {
            message += chunk;
        }).on('end', function() {
            sendToAll(message); 
            res.end("ok");
        });
        return;
    }
    if(parsedInfo.pathname == 'callServer'){
        res.setHeader('Content-Type', 'text/plain;charset=utf-8');
        res.setHeader("Cache-Control", "no-cache, must-revalidate");
        return;
    }
    fileServer.serve(req, res);
}).listen(8080);

