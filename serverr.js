var http = require('http');
var url = require('url');
let static = require('node-static');
let fileServer = new static.Server('.');

var http = require('http');
var arr = [];
function sendToAll(message) {
    arr.forEach( (item,index) => {
        item.end(message);
    });
}

http.createServer(function (req, res) {
    console.log('Server running on port 8080');
    let parsedInfo = url.parse(req.url, true);
    if(parsedInfo.pathname == '/request' && parsedInfo.method == 'POST'){
        req.setEncoding('utf8');
        let message = '';
        req.on('data', (value) => {
            message += value;
        }).on('end', function() {
            sendToAll(message); 
            res.end("ok");
        });
        return;
    }
    if(parsedInfo.pathname == '/callServer'){
        res.setHeader('Content-Type', 'text/plain;charset=utf-8');
        res.setHeader("Cache-Control", "no-cache, must-revalidate");
        arr.insert(res);
        console.log(arr);
        return;
    }
    fileServer.serve(req, res);
}).listen(8080);

