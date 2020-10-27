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
    
    if (req.url.match(/host\/resetquiz/) && req.method === 'POST') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(true));
      global.resetQuiz();
      console.log(global.quiz);
    }

    if (req.url.match(/host\/resetbuzzers/) && req.method === 'POST') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(true));
      global.resetBuzzers();
      console.log(global.quiz);
    }

    if (req.url.match(/host\/setscore/) && req.method === 'POST') {
      let body = [];
      req.on('data', (chunk) => {
        body.push(chunk);
      }).on('end', () => {
        rawbody = Buffer.concat(body).toString();
        // at this point, `body` has the entire request body stored in it as a string
        try {
          jsonbody = JSON.parse(rawbody);
        } catch (error) {
        
        }
        var foundIndex = global.quiz.players.findIndex(element => { return element.id === jsonbody.spelerId } );
        global.quiz.players[foundIndex].score = jsonbody.score;
        global.updateScore();
      });
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(true));
    }
  
    if (req.url.match(/^\/buzz/) && req.method === 'POST') {
      let body = [];
      req.on('data', (chunk) => {
        body.push(chunk);
      }).on('end', () => {
        rawbody = Buffer.concat(body).toString();
        // at this point, `body` has the entire request body stored in it as a string
        try {
          jsonbody = JSON.parse(rawbody);
        } catch (error) {
          
        }
        console.log('Buzzzz:',jsonbody.spelerId);
        if (!global.quiz.currentBuzzerOrder.includes(jsonbody.spelerId)) {
          global.quiz.currentBuzzerOrder.push(jsonbody.spelerId);
        }
        const messageObject = {currentBuzzerOrder: global.quiz.currentBuzzerOrder};
        const messagetext ='';
        let event = { type: 'buzzers', level: 'info', messagetext: messagetext, messageObject: messageObject };
        global.eventserver.sendEvent(event);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(true));
      });
      
    }


    if (req.url.match(/stream/)) {
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*',
      });
      eventTargets.push(res)
    }

  }).listen(8080);
}

function sendEvent(event) {
  eventTargets.forEach((res) => {
    res.write('data: ' + JSON.stringify(event) + '\n\n');
  });
}

module.exports = { startServer, sendEvent };
