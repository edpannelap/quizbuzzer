'use strict';

global.quiz = { 
    name: "eerste test Quiz",
    title: "eerste test Quiz titel",
    players : [{
        id: 1,
        score: 0,
        fullname: 'André',
        channelName: 'andre'
    },{
        id: 2,
        score: 9,
        fullname: 'Freek',
        channelName: 'freek'
    },{
        id: 3,
        score: 0,
        fullname: 'Maarten',
        channelName: 'maarten'
    },{
        id: 4,
        score: 3,
        fullname: 'Arjan',
        channelName: 'maarten'
    },{
        id: 5,
        score: 7,
        fullname: 'Olaf',
        channelName: 'olaf'
    },{
        id: 6,
        score: 2340,
        fullname: 'Niels',
        channelName: 'niels'
    },{
        id: 7,
        score: 0,
        fullname: 'Daan',
        channelName: 'daan'
    },{
        id: 8,
        score: 0,
        fullname: 'Edwin',
        channelName: 'edwin'
    }],
    currentBuzzerOrder :[]
}


global.eventserver = require('./eventserver');
global.eventserver.startServer();

let count = 0;
setInterval(function () {
    global.eventserver.sendEvent('event keep alive' + count++)
}, 60000);


global.resetQuiz = function() {
    global.quiz.currentBuzzerOrder = [];
    global.quiz.players.forEach(element => {
        element.score = 0;
    });
    const messageObject = {};
    const messagetext ='';
    let event = { type: 'resetQuiz', level: 'info', messagetext: messagetext, messageObject: global.quiz };
    global.eventserver.sendEvent(event);
    resetBuzzers();
}

global.nextQuestion = function() {
    global.quiz.currentBuzzerOrder = [];
    const messageObject = {};
    const messagetext ='';
    let event = { type: 'nextQuestion', level: 'info', messagetext: messagetext, messageObject: messageObject };
    global.eventserver.sendEvent(event);
    resetBuzzers();
}

global.resetBuzzers = function() {
    global.quiz.currentBuzzerOrder = [];
    const messageObject = {currentBuzzerOrder: global.quiz.currentBuzzerOrder};
    const messagetext ='';
    let event = { type: 'buzzers', level: 'info', messagetext: messagetext, messageObject: messageObject };
    global.eventserver.sendEvent(event);

}

global.forceReload = function () {
    const messageObject = {};
    const messagetext ='';
    let event = { type: 'forceReload', level: 'info', messagetext: messagetext, messageObject: messageObject };
    global.eventserver.sendEvent(event);
}

// init the quiz

// 
