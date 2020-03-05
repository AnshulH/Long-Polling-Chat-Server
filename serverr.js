var http = require('http');
var url = require('url');
var static = require('node-static');

var fileServer = new static.Server('.');

var subscribers = Object.create(null);

function onSubscribe(req, res) {
  var id = Math.random();

  res.setHeader('Content-Type', 'text/plain;charset=utf-8');
  res.setHeader("Cache-Control", "no-cache, must-revalidate");
  subscribers[id] = res;

  req.on('close', function() {
    delete subscribers[id];
  });
}

function publish(message) {
  for (var id in subscribers) {
    var res = subscribers[id];
    res.end(message);
  }
}

http.createServer(function (req, res) {
  var urlParsed = url.parse(req.url, true);
  if (urlParsed.pathname == '/subscribe') {
    onSubscribe(req, res);
    return;
  }
  if (urlParsed.pathname == '/publish' && req.method == 'POST') {
    req.setEncoding('utf8');
    var message = '';
    req.on('data', function(chunk) {
      message += chunk;
    }).on('end', function() {
      publish(message);
      res.end("ok");
    });
    return;
  }
  fileServer.serve(req, res);
}).listen(8085);
