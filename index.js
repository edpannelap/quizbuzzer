'use strict';

global.quiz = { 
    name: "eerste test Quiz",
    title: "eerste test Quiz",
    players : [{
        score: 0,
        fullname: 'André',
        channelName: 'andre'
    },{
        score: 0,
        fullname: 'Freek',
        channelName: 'freek'
    },{
        score: 0,
        fullname: 'Maarten',
        channelName: 'maarten'
    },{
        score: 0,
        fullname: 'Daan',
        channelName: 'daan'
    }],
    currentBuzzerOrder :[1,4,2]
}


const eventserver = require('./eventserver');
eventserver.startServer();

let count = 0;
setInterval(function () {
    eventserver.sendEvent('event keep alive' + count++)
}, 60000);




// init the quiz

// 