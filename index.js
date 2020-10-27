'use strict';

const eventserver = require('./eventserver');
eventserver.startServer();

let count = 0;
setInterval(function () {
    eventserver.sendEvent('event keep ailive' + count++)
}, 60000);
