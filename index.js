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
        fullname: 'Arjan',
        channelName: 'maarten'
    },{
        score: 0,
        fullname: 'Olaf',
        channelName: 'olaf'
    },{
        score: 0,
        fullname: 'Niels',
        channelName: 'niels'
    },{
        score: 0,
        fullname: 'Daan',
        channelName: 'daan'
    },{
        score: 0,
        fullname: 'Edwin',
        channelName: 'edwin'
    }],
    currentBuzzerOrder :[4,2,0]
}


global.eventserver = require('./eventserver');
global.eventserver.startServer();

let count = 0;
setInterval(function () {
    global.eventserver.sendEvent('event keep alive' + count++)
}, 60000);




// init the quiz

// 