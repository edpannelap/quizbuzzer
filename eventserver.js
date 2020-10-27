var http = require('http');
let hostname = process.env.NODE_HOSTNAME || 'localhost';
var fs = require('fs');

let eventTargets = [];

function startServer() {
  http.createServer(function (req, res) {
    if (req.url.match(/client/)) {
      let contentType = 'text/html';
      fs.readFile('./front-end/static/html/index.html', function (error, content) {
        if (error) {
          if (error.code == 'ENOENT') {
            fs.readFile('./front-end/static/html/404.html', function (error, content) {
              res.writeHead(200, { 'Content-Type': contentType });
              res.end(content, 'utf-8');
            });
          }
          else {
            res.writeHead(500);
            res.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
            res.end();
          }
        }
        else {
          res.writeHead(200, { 'Content-Type': contentType });
          res.end(content, 'utf-8');
        }
      });
    }

    if (req.url.match(/quizinfo/)) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(global.quiz));
    }

    if (req.url.match(/stream/)) {
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*',
      });
      eventTargets.push(res)
    }

  }).listen(80);
}

function sendEvent(event) {
  eventTargets.forEach((res) => {
    res.write('data: ' + JSON.stringify(event) + '\n\n');
  });
}

module.exports = { startServer, sendEvent };